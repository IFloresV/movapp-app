import axios from "axios";
import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

const { API_URL } = Constants.expoConfig?.extra as Record<string, string>;

// Función para obtener token
const getToken = async (): Promise<string | null> => {
   return await SecureStore.getItemAsync("Token");
};

const getRefreshToken = async (): Promise<string | null> => {
   return await SecureStore.getItemAsync("RefreshToken");
};
// Función para guardar tokens
const saveToken = async (token: string) => {
   await SecureStore.setItemAsync("Token", token);
};
const saveRefreshToken = async (token: string) => {
   await SecureStore.setItemAsync("RefreshToken", token);
};

type RequestData = Record<string, any>;

const Service = {
   // --- Auth ---
   register: async (data: RequestData) => {
      try {
         const response = await axios.post(`${API_URL}auth/register`, data, {
            headers: { "Content-Type": "application/json" },
            validateStatus: () => true,
         });
         if (response.data?.accessToken) {
            await saveToken(response.data.accessToken);
         }
         if (response.data?.device?.refresh_hash) {
            await saveRefreshToken(response.data.device.refresh_hash);
         }

         return response;
      } catch (error) {
         console.error("❌ Error de red en registro:", error);
         throw error;
      }
   },

   login: async (data: RequestData) => {
      try {
         const response = await axios.post(`${API_URL}auth/login`, data, {
            headers: { "Content-Type": "application/json" },
            validateStatus: () => true,
         });

         if (response.data?.accessToken) {
            await saveToken(response.data.accessToken);
         }
         if (response.data?.device?.refresh_hash) {
            await saveRefreshToken(response.data.device.refresh_hash);
         }

         return response;
      } catch (error) {
         console.error("❌ Error de red en login:", error);
         throw error;
      }
   },
};

export default Service;
