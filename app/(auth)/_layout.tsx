// app/(auth)/_layout.tsx
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
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
         <Stack.Screen name="login" />
         <Stack.Screen name="register" />
         <Stack.Screen name="conditions" />
         <Stack.Screen name="privacy" />
         <Stack.Screen name="forgot-pass" />
      </Stack>
   );
}
