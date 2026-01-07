import React, { createContext, useContext, useState } from "react";

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

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
   const [notifications, setNotifications] = useState<NotificationItem[]>([]);

   const addNotification = (n: NotificationItem) => setNotifications((prev) => [n, ...prev]);
   const clearNotifications = () => setNotifications([]);
   const removeNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));

   return (
      <NotificationContext.Provider value={{ notifications, addNotification, clearNotifications, removeNotification }}>
         {children}
      </NotificationContext.Provider>
   );
};

export const useNotificationStore = () => useContext(NotificationContext);
