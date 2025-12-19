// api/axiosInstance.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import Env from "@/utils/Config";
const { API_URL } = Env;

const api = axios.create({
   baseURL: API_URL,
   timeout: 20000, // ✅ 20 segundos por defecto
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
   (error) => {
      console.error("\x1b[31m[API] ❌ Request error:", error);
      return Promise.reject(error);
   },
);

// RESPONSE INTERCEPTOR: Maneja token expirado y timeouts
api.interceptors.response.use(
   (response) => {
      // Si no es 401, retornar respuesta normal
      if (response.status !== 401) {
         return response;
      }

      // Si es 401, intentar refresh
      return handleUnauthorized(response);
   },
   (error) => {
      // ✅ Manejo de timeout
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
         console.error("\x1b[31m[API] ⏱️ Timeout después de 30s");
         error.message = "TIMEOUT";
         error.isTimeout = true;
      }

      // ✅ Manejo de errores de red
      if (error.code === "ERR_NETWORK" || error.message?.includes("Network")) {
         console.error("\x1b[31m[API] 📡 Network error");
         error.message = "NETWORK_ERROR";
         error.isNetworkError = true;
      }

      return Promise.reject(error);
   },
);

const handleUnauthorized = async (originalResponse: any) => {
   const originalRequest = originalResponse.config;

   // Evitar loop infinito
   if (originalRequest._retry) {
      console.log("\x1b[31m[API] ❌ Refresh ya intentado, redirigir a login");
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
         console.log("\x1b[31m[API] ❌ No hay refresh token");
         isRefreshing = false;
         return originalResponse;
      }

      console.log("\x1b[33m[API] 🔄 Intentando refrescar token...");

      // ✅ Refresh con timeout de 10 segundos
      const refreshResponse = await axios.post(`${API_URL}auth/refresh`, { refreshToken }, { timeout: 10000 });

      if (refreshResponse.data?.accessToken) {
         const newAccessToken = refreshResponse.data.accessToken;
         const newRefreshToken = refreshResponse.data.refreshToken || refreshToken;

         // Guardar nuevos tokens
         await saveToken(newAccessToken);
         await saveRefreshToken(newRefreshToken);

         console.log("\x1b[32m[API] ✅ Token refrescado exitosamente");

         // Notificar a requests en espera
         onRefreshed(newAccessToken);

         // Reintentar request original
         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
         isRefreshing = false;
         return api(originalRequest);
      }

      console.log("\x1b[31m[API] ❌ No se recibió accessToken en refresh");
      isRefreshing = false;
      return originalResponse;
   } catch (error: any) {
      console.error("\x1b[31m[API] ❌ Error al refrescar token:", error.message);
      isRefreshing = false;

      // ✅ Si el refresh falló por timeout, no borrar tokens (podría ser problema de red)
      if (error.code !== "ECONNABORTED") {
         // Limpiar tokens solo si NO es timeout
         await SecureStore.deleteItemAsync("ACCESS_TOKEN");
         await SecureStore.deleteItemAsync("REFRESH_TOKEN");
         await SecureStore.deleteItemAsync("USER_DATA");
      }

      return originalResponse;
   }
};

export default api;
