// api/axiosInstance.ts
import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const { API_URL } = Constants.expoConfig?.extra as Record<string, string>;

const api = axios.create({
   baseURL: API_URL,
   validateStatus: () => true, // Permite manejar todos los status codes
});

// Helpers para tokens
const getToken = async () => await SecureStore.getItemAsync("ACCESS_TOKEN");
const getRefreshToken = async () => await SecureStore.getItemAsync("REFRESH_TOKEN");
const saveToken = async (token: string) => await SecureStore.setItemAsync("ACCESS_TOKEN", token);
const saveRefreshToken = async (token: string) => await SecureStore.setItemAsync("REFRESH_TOKEN", token);

// Flag para evitar múltiples refresh simultáneos
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
   refreshSubscribers.forEach((callback) => callback(token));
   refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
   refreshSubscribers.push(callback);
};

// REQUEST INTERCEPTOR: Añade token a cada petición
api.interceptors.request.use(
   async (config) => {
      const token = await getToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => Promise.reject(error),
);

// RESPONSE INTERCEPTOR: Maneja token expirado
api.interceptors.response.use(
   (response) => {
      // Si no es 401, retornar respuesta normal
      if (response.status !== 401) {
         return response;
      }

      // Si es 401, intentar refresh
      return handleUnauthorized(response);
   },
   (error) => Promise.reject(error),
);

const handleUnauthorized = async (originalResponse: any) => {
   const originalRequest = originalResponse.config;

   // Evitar loop infinito
   if (originalRequest._retry) {
      console.log("❌ Refresh ya intentado, redirigir a login");
      return originalResponse;
   }

   // Si ya estamos refrescando, esperar
   if (isRefreshing) {
      return new Promise((resolve) => {
         addRefreshSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
         });
      });
   }

   originalRequest._retry = true;
   isRefreshing = true;

   try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
         console.log("❌ No hay refresh token");
         isRefreshing = false;
         return originalResponse;
      }

      console.log("🔄 Intentando refrescar token...");

      const refreshResponse = await axios.post(`${API_URL}auth/refresh`, {
         refreshToken,
      });

      if (refreshResponse.data?.accessToken) {
         const newAccessToken = refreshResponse.data.accessToken;
         const newRefreshToken = refreshResponse.data.refreshToken || refreshToken;

         // Guardar nuevos tokens
         await saveToken(newAccessToken);
         await saveRefreshToken(newRefreshToken);

         console.log("✅ Token refrescado exitosamente");

         // Notificar a requests en espera
         onRefreshed(newAccessToken);

         // Reintentar request original
         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
         isRefreshing = false;
         return api(originalRequest);
      }

      console.log("❌ No se recibió accessToken en refresh");
      isRefreshing = false;
      return originalResponse;
   } catch (error) {
      console.error("❌ Error al refrescar token:", error);
      isRefreshing = false;

      // Limpiar tokens si el refresh falló
      await SecureStore.deleteItemAsync("ACCESS_TOKEN");
      await SecureStore.deleteItemAsync("REFRESH_TOKEN");
      await SecureStore.deleteItemAsync("USER_DATA");

      return originalResponse;
   }
};

export default api;
