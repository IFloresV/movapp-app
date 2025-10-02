import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";

import SplashScreen from "@/components/SplashScreen";
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
            <Stack>
               <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
         </SafeAreaProvider>
      </>
   );
}
