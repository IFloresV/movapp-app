// app/(auth)/forgot-pass.tsx
import AlertComponent from "@/components/Alert";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Service from "@/api/AuthService";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useAxios } from "@/hooks/useAxios";

export default function ForgotPasswordScreen() {
   const router = useRouter();
   const [email, setEmail] = useState("");

   const [sendRecoveryFetch, data, error, , loading, , resetData] = useAxios(Service.recover);

   const [alert, setAlert] = useState<{
      type: "success" | "error";
      title: string;
      message: string;
      onlyAccept?: boolean;
      onAccept?: () => void;
   } | null>(null);

   // 👉 Procesar respuesta SOLO desde data
   useEffect(() => {
      if (!data) return;

      if (data.success) {
         setAlert({
            type: "success",
            title: "Código enviado",
            message: "Revisa tu correo electrónico para continuar",
            onlyAccept: true,
            onAccept: () => {
               setAlert(null);
               router.push({
                  pathname: "/(auth)/reset-pass",
                  params: { email: email.toLowerCase().trim() },
               });
               resetData();
            },
         });
      } else {
         setAlert({
            type: "error",
            title: "Error",
            message: (data as any)?.message || "No se pudo enviar el código. Verifica tu correo.",
            onlyAccept: true,
            onAccept: () => {
               setAlert(null);
               resetData();
            },
         });
      }
   }, [data]);

   const handleSubmit = async () => {
      if (!email) {
         setAlert({
            type: "error",
            title: "Campo Incompleto",
            message: "Por favor ingresa tu correo electrónico",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         setAlert({
            type: "error",
            title: "Email inválido",
            message: "Por favor ingresa un email válido",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      try {
         await sendRecoveryFetch({ email: email.toLowerCase().trim() });
      } catch {
         setAlert({
            type: "error",
            title: "Error",
            message: error || "No se pudo enviar el código",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
      }
   };

   return (
      <View className="flex-1 bg-movapp-background">
         <Header showNotifications={false} showCart={false} />

         {alert && (
            <AlertComponent
               visible={!!alert}
               type={alert.type}
               title={alert.title}
               message={alert.message}
               onlyAccept={alert.onlyAccept}
               onAccept={alert.onAccept}
            />
         )}

         <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="items-center pt-32 pb-8">
               <Feather name="lock" size={48} color={Colors.movapp.primary} />
               <Text className="text-white text-2xl font-bold mt-3">Recuperar Contraseña</Text>
            </View>

            <View className="px-7">
               <View className="mb-8">
                  <Text className="text-white text-sm font-semibold mb-2 p-2">Correo Electrónico</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={email}
                     onChangeText={setEmail}
                     placeholder="ejemplo@correo.com"
                     placeholderTextColor={Colors.movapp.placeholderTextColor}
                     keyboardType="email-address"
                     autoCapitalize="none"
                     editable={!loading}
                  />
               </View>

               <TouchableOpacity
                  onPress={handleSubmit}
                  className="py-4 rounded-xl items-center mb-6"
                  style={{ backgroundColor: Colors.movapp.primary }}
                  disabled={loading}
               >
                  {loading ? (
                     <ActivityIndicator color="white" />
                  ) : (
                     <Text className="text-white font-bold">Enviar Código</Text>
                  )}
               </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-10">
               {/* <Text className="text-white text-sm">¿Recordaste tu contraseña? </Text> */}
               <TouchableOpacity onPress={() => router.back()}>
                  <Text className="font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     ¿Recordaste tu contraseña?
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAwareScrollView>
      </View>
   );
}
