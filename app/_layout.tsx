// app/_layout.tsx
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider, useApp } from "@/context/AppContext";
import { CartProvider } from "@/context/CartContext";
import { RegisterProvider } from "@/context/RegisterContext";

import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

import Env from "@/utils/Config";
import { StripeProvider } from "@stripe/stripe-react-native";

import "../global.css";

import SplashScreen from "@/components/SplashScreen";

import { setLogoutCallback } from "@/api/axiosInstance";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

function AppContent() {
   const { logout } = useApp();

   useEffect(() => {
      // console.log("\x1b[33m[Layout] 🔧 Registrando logout callback en axios");
      setLogoutCallback(logout);
   }, [logout]);

   return (
      <Stack
         screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.movapp.background },
            animation: "slide_from_right",
            gestureEnabled: true,
            gestureDirection: "horizontal",
         }}
      >
         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
         <Stack.Screen name="reels" options={{ headerShown: false }} />
      </Stack>
   );
}

export default function RootLayout() {
   const [isAppReady, setIsAppReady] = useState(false);

   useEffect(() => {
      const subscription = Notifications.addNotificationReceivedListener((notification) => {
         console.log("Notificación recibida:", notification);
      });

      return () => subscription.remove();
   }, []);

   if (!isAppReady) {
      return (
         <SplashScreen
            onFinish={(isCancelled) => {
               !isCancelled && setIsAppReady(true);
            }}
         />
      );
   }

   return (
      <>
         <SafeAreaProvider>
            <StripeProvider publishableKey={Env.STRIPE_PUBLISHABLE_KEY ?? ""}>
               <AppProvider>
                  <RegisterProvider>
                     <CartProvider>
                        <AppContent />
                     </CartProvider>
                  </RegisterProvider>
               </AppProvider>
            </StripeProvider>
         </SafeAreaProvider>
      </>
   );
}
