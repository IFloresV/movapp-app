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
            <Stack
               screenOptions={{
                  gestureEnabled: true,
                  gestureDirection: "horizontal",
                  headerShown: false,
               }}
            >
               <Stack.Screen name="index" options={{ title: "" }} />
               <Stack.Screen name="store" options={{ title: "" }} />
               <Stack.Screen name="courses" options={{ title: "" }} />
               <Stack.Screen name="profile" options={{ title: "" }} />
            </Stack>
         </SafeAreaProvider>
      </>
   );
}
