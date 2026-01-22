// api/axiosInstance.ts
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

import { STORAGE_KEYS } from "@/constants/storageKeys";
import Env from "@/utils/Config";
const { API_URL } = Env;

const api = axios.create({
   baseURL: API_URL,
   timeout: 10000,
   validateStatus: () => true,
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

// ✅ Callback para logout desde el contexto
let logoutCallback: (() => Promise<void>) | null = null;

export const setLogoutCallback = (callback: () => Promise<void>) => {
   logoutCallback = callback;
};

/**
 * Limpia el storage y ejecuta el logout del contexto
 */
const forceLogout = async () => {
   try {
      await Promise.all([
         SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
         SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS),
         SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH),
      ]);

      if (logoutCallback) {
         await logoutCallback();
      }

      Alert.alert("Sesión expirada", "Por favor, inicia sesión nuevamente.");

      setTimeout(() => {
         router.replace("/");
      }, 1000);
   } catch (error) {
      console.log("\x1b[31m[API] ❌ Error en forceLogout:", error);
   }
};

// REQUEST INTERCEPTOR
api.interceptors.request.use(
   async (config) => {
      const token = await getToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["content-type"] = "application/json";
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
   (response) => {
      // ✅ Solo intentar refresh si:
      // 1. Es un error 401 o 403 con mensaje específico de token
      // 2. La petición original tenía un Authorization header (estaba autenticada)
      const hadAuthHeader = response.config?.headers?.Authorization;
      const isTokenError =
         response.status === 401 || (response.status === 403 && response.data?.message === "Token inválido o expirado");

      // Solo intentar refresh si la petición original TENÍA token Y el error es de token
      if (isTokenError && hadAuthHeader) {
         return handleUnauthorized(response);
      }

      return response;
   },
   (error) => {
      // Manejo de timeout
      if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
         error.message = "TIMEOUT";
         error.isTimeout = true;
         Alert.alert(
            "Error de conexión",
            "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.",
         );
      }

      // Manejo de errores de red
      if (error.code === "ERR_NETWORK" || error.message?.includes("Network")) {
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
      await forceLogout();
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
         isRefreshing = false;
         await forceLogout();
         return originalResponse;
      }

      const deviceId = await getDeviceId();

      const refreshResponse = await axios.post(
         `${API_URL}auth/refresh-token`,
         { refreshToken, deviceId },
         { timeout: 10000 },
      );

      if (refreshResponse.data?.accessToken) {
         const newAccessToken = refreshResponse.data.accessToken;
         const newRefreshToken = refreshResponse.data.refreshToken || refreshToken;

         await saveToken(newAccessToken);
         await saveRefreshToken(newRefreshToken);

         onRefreshed(newAccessToken);

         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
         isRefreshing = false;

         return api(originalRequest);
      }

      // Si el refresh no devolvió token, hacer logout
      isRefreshing = false;
      await forceLogout();
      return originalResponse;
   } catch (error: any) {
      isRefreshing = false;

      // Solo hacer logout si el refresh falló con errores específicos
      if (error.response) {
         const status = error.response.status;

         // Error 401, 403 o 500 en REFRESH = sesión definitivamente expirada
         if (status === 401 || status === 403 || status === 500) {
            await forceLogout();
            return originalResponse;
         }
      }

      // Si no es timeout, forzar logout
      if (error.code !== "ECONNABORTED") {
         await forceLogout();
      }

      return originalResponse;
   }
};

const getDeviceId = async (): Promise<string> => {
   let deviceId = await SecureStore.getItemAsync("deviceId");
   if (!deviceId) {
      deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await SecureStore.setItemAsync("deviceId", deviceId);
   }
   return deviceId;
};

export default api;
