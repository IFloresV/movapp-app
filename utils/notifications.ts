import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Solicita permisos y obtiene el token push
export async function registerForPushNotificationsAsync() {
   let token;
   if (Device.isDevice) {
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
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // Puedes enviar este token a tu backend aquí
   } else {
      alert("Debes usar un dispositivo físico para recibir notificaciones push.");
   }

   if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
         name: "Notificaciones",
         importance: Notifications.AndroidImportance.MAX,
         vibrationPattern: [0, 250, 250, 250],
         lightColor: "#FF231F7C",
      });
   }

   return token;
}
