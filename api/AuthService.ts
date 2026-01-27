import * as SecureStore from "expo-secure-store";
import api from "./axiosInstance";

type RequestData = Record<string, any>;

const saveToken = async (t: string) => SecureStore.setItemAsync("ACCESS_TOKEN", t);
const saveRefreshToken = async (t: string) => SecureStore.setItemAsync("REFRESH_TOKEN", t);

const registerPushToken = async (deviceId: string, pushToken: string) => {
   try {
      const response = await api.post("/notifications/register-token", {
         deviceId,
         pushToken,
      });
      return response.data;
   } catch (error) {
      console.log("Error registrando push token:", error);
      throw error;
   }
};

const AuthService = {
   register: async (data: RequestData, deviceId?: string, pushToken?: string) => {
      const response = await api.post("auth/register", data);

      if (response.data?.accessToken) await saveToken(response.data.accessToken);
      if (response.data?.device?.refresh_hash) await saveRefreshToken(response.data.device.refresh_hash);

      // Registrar push token si se proveen los datos
      if (deviceId && pushToken) {
         await registerPushToken(deviceId, pushToken);
      }

      return response;
   },

   login: async (data: RequestData, deviceId?: string, pushToken?: string) => {
      const response = await api.post("auth/login", data);

      if (response.data?.accessToken) await saveToken(response.data.accessToken);
      if (response.data?.device?.refresh_hash) await saveRefreshToken(response.data.device.refresh_hash);

      // Registrar push token si se proveen los datos
      if (deviceId && pushToken) {
         await registerPushToken(deviceId, pushToken);
      }

      return response;
   },

   recover: async (data: RequestData) => {
      return await api.post("auth/recover", data);
   },

   resetPassword: async (data: RequestData, deviceId?: string, pushToken?: string) => {
      const response = await api.post("auth/reset-password", data);

      // Registrar push token si se proveen los datos
      if (deviceId && pushToken) {
         await registerPushToken(deviceId, pushToken);
      }

      return response;
   },

   registerPushToken, // Exporta la función para uso directo si se requiere

   deleteAccount: async () => {
      const response = await api.delete("/auth/delete-account");
      return response.data;
   },
};

export default AuthService;
