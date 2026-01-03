import api from "./axiosInstance";

const NotificationService = {
   getDevice: async (deviceId: string) => {
      const response = await api.get(`/notifications/device/${deviceId}`);
      return response.data;
   },
   toggle: async (deviceId: string, enabled: boolean) => {
      const response = await api.post("/notifications/toggle", { deviceId, enabled });
      return response.data;
   },
};

export default NotificationService;
