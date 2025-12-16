import * as SecureStore from "expo-secure-store";
import api from "./axiosInstance";

type RequestData = Record<string, any>;

const saveToken = async (t: string) => SecureStore.setItemAsync("ACCESS_TOKEN", t);
const saveRefreshToken = async (t: string) => SecureStore.setItemAsync("REFRESH_TOKEN", t);

const Service = {
   register: async (data: RequestData) => {
      const response = await api.post("auth/register", data);

      if (response.data?.accessToken) await saveToken(response.data.accessToken);
      if (response.data?.device?.refresh_hash) await saveRefreshToken(response.data.device.refresh_hash);

      return response;
   },

   login: async (data: RequestData) => {
      const response = await api.post("auth/login", data);

      if (response.data?.accessToken) await saveToken(response.data.accessToken);
      if (response.data?.device?.refresh_hash) await saveRefreshToken(response.data.device.refresh_hash);

      return response;
   },

   recover: async (data: RequestData) => {
      return await api.post("auth/recover", data);
   },

   resetPassword: async (data: RequestData) => {
      return await api.post("auth/reset-password", data);
   },
};

export default Service;
