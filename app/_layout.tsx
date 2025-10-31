import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ConfigProvider } from "@/context/ConfigContext";
import { RegisterProvider } from "@/context/RegisterContext";
import { UserProvider } from "@/context/UserContext";

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
            <ConfigProvider>
               <UserProvider>
                  <RegisterProvider>
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
                  </RegisterProvider>
               </UserProvider>
            </ConfigProvider>
         </SafeAreaProvider>
      </>
   );
}
