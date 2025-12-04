import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CartProvider } from "@/context/CartContext";
import { ConfigProvider } from "@/context/ConfigContext";
import { RegisterProvider } from "@/context/RegisterContext";
import { UserProvider } from "@/context/UserContext";

import { STRIPE_PUBLISHABLE_KEY } from "@/utils/Config";
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
            <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
               <ConfigProvider>
                  <UserProvider>
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
                  </UserProvider>
               </ConfigProvider>
            </StripeProvider>
         </SafeAreaProvider>
      </>
   );
}
