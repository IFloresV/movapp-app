import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export type NotificationItem = {
   id: string;
   title: string;
   body: string;
   data: any;
   date: string;
};

const NotificationContext = createContext<{
   notifications: NotificationItem[];
   addNotification: (n: NotificationItem) => void;
   clearNotifications: () => void;
   removeNotification: (id: string) => void;
}>({
   notifications: [],
   addNotification: () => {},
   clearNotifications: () => {},
   removeNotification: () => {},
});

const STORAGE_KEY = "notifications";

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
   const [notifications, setNotifications] = useState<NotificationItem[]>([]);

   // Cargar historial al iniciar
   useEffect(() => {
      AsyncStorage.getItem(STORAGE_KEY).then((data) => {
         if (data) setNotifications(JSON.parse(data));
      });
   }, []);

   const addNotification = (n: NotificationItem) => {
      setNotifications((prev) => {
         const updated = [n, ...prev];
         AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
         return updated;
      });
   };

   const clearNotifications = () => {
      setNotifications([]);
      AsyncStorage.removeItem(STORAGE_KEY);
   };

   const removeNotification = (id: string) => {
      setNotifications((prev) => {
         const updated = prev.filter((n) => n.id !== id);
         AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
         return updated;
      });
   };

   return (
      <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications, removeNotification }}>
         {children}
      </NotificationContext.Provider>
   );
};

export const useNotificationStore = () => useContext(NotificationContext);
