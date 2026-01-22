import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configurar el handler PRIMERO con TODAS las propiedades requeridas
Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true, // ⚠️ Faltaba esta
      shouldShowList: true, // ⚠️ Faltaba esta
   }),
});

export async function registerForPushNotificationsAsync() {
   // Crear el canal PRIMERO
   if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
         name: "Notificaciones",
         importance: Notifications.AndroidImportance.MAX,
         vibrationPattern: [0, 250, 250, 250],
         lightColor: "#FF231F7C",
         sound: "default",
         enableVibrate: true,
      });
   }

   if (!Device.isDevice) {
      alert("Debes usar un dispositivo físico para recibir notificaciones push.");
      return;
   }

   const { status: existingStatus } = await Notifications.getPermissionsAsync();
   let finalStatus = existingStatus;

   if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
   }

   if (finalStatus !== "granted") {
      alert("No se pudieron obtener permisos para notificaciones push.");
      return;
   }

   try {
      const token = (
         await Notifications.getExpoPushTokenAsync({
            projectId: "197eaaeb-4090-4e85-b082-35f3420991da",
         })
      ).data;
      console.log("Token push obtenido:", token);
      return token;
   } catch (error) {
      console.log("Error obteniendo token:", error);
   }
}
