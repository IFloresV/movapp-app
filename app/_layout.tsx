import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
            <UserProvider>
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
               </Stack>
            </UserProvider>
         </SafeAreaProvider>
      </>
   );
}
