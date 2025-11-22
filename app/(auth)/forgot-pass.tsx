import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Service from "@/api/AuthService";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useAxios } from "@/hooks/useAxios";

export default function ForgotPasswordScreen() {
   const router = useRouter();
   const [email, setEmail] = useState("");

   const [sendRecoveryFetch, data, error, , loading, , resetData] = useAxios(Service.recover);

   const handleSubmit = async () => {
      // Validación
      if (!email) {
         Alert.alert("Campo Incompleto", "Por favor ingresa tu correo electrónico");
         return;
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         Alert.alert("Email inválido", "Por favor ingresa un email válido");
         return;
      }

      try {
         const response = await sendRecoveryFetch({ email: email.toLowerCase().trim() });

         if (response?.success) {
            Alert.alert("Código enviado", "Revisa tu correo electrónico para el código de recuperación", [
               {
                  text: "Continuar",
                  onPress: () => {
                     router.push({
                        pathname: "/(auth)/reset-pass",
                        params: { email: email.toLowerCase().trim() },
                     });
                     resetData();
                  },
               },
            ]);
         } else {
            Alert.alert(
               "Error",
               "message" in response && typeof response.message === "string"
                  ? response.message
                  : "No se pudo enviar el código. Verifica tu correo.",
            );
            // Alert.alert("Error", "No se pudo enviar el código. Verifica tu correo.");

            resetData();
         }
      } catch (err) {
         console.error("❌ Error en recuperación:", err);
         Alert.alert("Error", error || "No se pudo enviar el código. Intenta de nuevo.");
         resetData();
      }
   };

   return (
      <View className="flex-1 bg-movapp-background">
         <Header showNotifications={false} showCart={false} />
         <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={20}
            contentContainerStyle={{ flexGrow: 1 }}
         >
            <View className="items-center pt-32 pb-8">
               <Feather name="lock" size={48} color={Colors.movapp.primary} />
               <Text className="text-white text-2xl font-bold mt-3">Recuperar Contraseña</Text>
               <Text className="text-gray-400 text-sm text-center mt-2 px-8">
                  Ingresa tu correo electrónico y te enviaremos un código de verificación
               </Text>
            </View>

            {/* Formulario */}
            <View className="px-7">
               {/* Correo Electrónico */}
               <View className="mb-8">
                  <Text className="text-white text-sm font-semibold mb-2">Correo Electrónico</Text>
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

               {/* Botón de Enviar Código */}
               <TouchableOpacity
                  onPress={handleSubmit}
                  className="py-4 rounded-xl items-center mb-6"
                  style={{ backgroundColor: Colors.movapp.primary }}
                  activeOpacity={0.8}
                  disabled={loading}
               >
                  {loading ? (
                     <ActivityIndicator color="white" />
                  ) : (
                     <Text className="text-white text-base font-bold">Enviar Código</Text>
                  )}
               </TouchableOpacity>
            </View>

            {/* Volver a Inicio de Sesión */}
            <View className="flex-row justify-center mt-10">
               <Text className="text-white text-sm">¿Recordaste tu contraseña? </Text>
               <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} disabled={loading}>
                  <Text className="text-md font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     Inicia Sesión
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAwareScrollView>
      </View>
   );
}
