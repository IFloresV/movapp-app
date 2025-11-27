// api/axiosInstance.ts
import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const { API_URL } = Constants.expoConfig?.extra as Record<string, string>;

const api = axios.create({
   baseURL: API_URL,
   validateStatus: () => true,
});

const getToken = async () => await SecureStore.getItemAsync("Token");
const getRefreshToken = async () => await SecureStore.getItemAsync("RefreshToken");
const saveToken = async (token: string) => await SecureStore.setItemAsync("Token", token);

api.interceptors.request.use(async (config) => {
   console.log("\x1b[32m", "Interceptor Request");
   const token = await getToken();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

api.interceptors.response.use(async (response) => {
   if (response.status !== 401) return response;

   const refreshToken = await getRefreshToken();
   if (!refreshToken) return response;

   try {
      const refreshResponse = await axios.post(`${API_URL}auth/refresh`, { refreshToken });
      if (refreshResponse.data?.accessToken) {
         await saveToken(refreshResponse.data.accessToken);

         // reintentar request original
         response.config.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
         return api(response.config);
      }
   } catch (e) {
      console.log("Error refrescando token:", e);
   }

   return response;
});

export default api;
