import Constants from "expo-constants";
import * as Device from "expo-device";
import { Platform } from "react-native";

// Detectar si corre en Expo Go: en SDK 53+ removieron push remoto de Android.
// Importar `expo-notifications` en ese contexto tira un error a nivel de módulo,
// así que cargamos el paquete dinámicamente sólo cuando NO estamos en Expo Go Android.
const isExpoGo = Constants.executionEnvironment === "storeClient";
export const pushDisabled = isExpoGo && Platform.OS === "android";

type NotificationsModule = typeof import("expo-notifications");

let cachedNotifications: NotificationsModule | null = null;
function loadNotifications(): NotificationsModule | null {
   if (pushDisabled) return null;
   if (cachedNotifications) return cachedNotifications;
   cachedNotifications = require("expo-notifications");
   return cachedNotifications;
}

let handlerConfigured = false;
function ensureHandlerConfigured(Notifications: NotificationsModule) {
   if (handlerConfigured) return;
   Notifications.setNotificationHandler({
      handleNotification: async () => ({
         shouldShowAlert: true,
         shouldPlaySound: true,
         shouldSetBadge: false,
         shouldShowBanner: true,
         shouldShowList: true,
      }),
   });
   handlerConfigured = true;
}

/**
 * Wrapper de `Notifications.addNotificationReceivedListener` que es no-op
 * cuando el push está deshabilitado (Expo Go Android). Devuelve un objeto
 * compatible con `{ remove(): void }` para que el caller pueda hacer cleanup.
 */
export function addNotificationReceivedListener(
   listener: Parameters<NotificationsModule["addNotificationReceivedListener"]>[0],
): { remove: () => void } {
   const Notifications = loadNotifications();
   if (!Notifications) {
      return { remove: () => {} };
   }
   return Notifications.addNotificationReceivedListener(listener);
}

export async function registerForPushNotificationsAsync() {
   const Notifications = loadNotifications();
   if (!Notifications) {
      console.log("[notifications] Push remoto deshabilitado en Expo Go (Android, SDK 53+).");
      return;
   }

   ensureHandlerConfigured(Notifications);

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
