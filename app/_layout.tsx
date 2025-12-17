// app/_layout.tsx
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppProvider } from "@/context/AppContext"; // 🎯 Nuevo contexto unificado
import { CartProvider } from "@/context/CartContext";
import { RegisterProvider } from "@/context/RegisterContext";

import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession(); // For Stripe OAuth flow Android

import Env from "@/utils/Config";
import { StripeProvider } from "@stripe/stripe-react-native";

import "../global.css";

import SplashScreen from "@/components/SplashScreen";

import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
   const [isAppReady, setIsAppReady] = useState(false);

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
                     </CartProvider>
                  </RegisterProvider>
               </AppProvider>
            </StripeProvider>
         </SafeAreaProvider>
      </>
   );
}
