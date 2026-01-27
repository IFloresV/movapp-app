// app/(auth)/login.tsx
import AlertComponent from "@/components/Alert";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useApp } from "@/context/AppContext";

import AuthService from "@/api/AuthService";

import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

import { useAxios } from "@/hooks/useAxios";

import { CartContext } from "@/context/CartContext";
import { registerForPushNotificationsAsync } from "@/utils/notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function LoginScreen() {
   const { login } = useApp();
   const router = useRouter();
   const cartContext = useContext(CartContext);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [showPassword, setShowPassword] = useState(false);

   const [loginFetch, data, error, , loading, , resetData] = useAxios(AuthService.login);

   const [alert, setAlert] = useState<{
      type: "success" | "error";
      title: string;
      message: string;
      onlyAccept?: boolean;
      onAccept?: () => void;
      onCancel?: () => void;
   } | null>(null);

   useEffect(() => {
      if (!data) return;
      if (data.success) {
         (async () => {
            login(data.user);
            if (cartContext?.clearCart) {
               await cartContext.clearCart();
            }
            setAlert({
               type: "success",
               title: "¡Bienvenido de nuevo!",
               message: "Has iniciado sesión exitosamente",
               onlyAccept: true,
               onAccept: () => {
                  setAlert(null);
                  router.replace("/");
                  resetData();
               },
            });
         })();
      } else {
         const messages = data.errors
            ? data.errors.map((e: { msg: string }) => e.msg).join("\n")
            : data.message || "Credenciales incorrectas";
         setAlert({
            type: "error",
            title: "Error",
            message: messages,
            onlyAccept: true,
            onAccept: () => {
               setAlert(null);
               resetData();
            },
         });
      }
   }, [data]);

   const getDeviceId = async (): Promise<string> => {
      let deviceId = await SecureStore.getItemAsync("deviceId");
      if (!deviceId) {
         deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
         await SecureStore.setItemAsync("deviceId", deviceId);
      }
      return deviceId;
   };

   const handleLogin = async () => {
      // Validaciones
      if (!formData.email || !formData.password) {
         setAlert({
            type: "error",
            title: "Campos Incompletos",
            message: "Por favor completa todos los campos",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      // Validación básica de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
         setAlert({
            type: "error",
            title: "Email inválido",
            message: "Por favor ingresa un email válido",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      const deviceId = await getDeviceId();
      const device = Device.deviceName || "Unknown";
      const platform = Platform.OS;
      const model = Device.modelName || "Unknown";
      const appVersion = Constants.expoConfig?.version || "1.0.0";

      const payload = {
         email: formData.email.toLowerCase().trim(),
         password: formData.password,
         deviceId,
         device,
         platform,
         model,
         appVersion,
      };

      let pushToken: string | undefined = undefined;
      try {
         pushToken = await registerForPushNotificationsAsync();
      } catch (pushError) {
         console.log("No se pudo obtener push token, se continuará sin notificaciones push.");
         console.log("❌ Error en Token de Push:", pushError);
      }

      try {
         // Llamar a login pasando deviceId y pushToken (puede ser undefined)
         await loginFetch(payload, deviceId, pushToken);
      } catch (err) {
         console.log("❌ Error en login:", err);
         setAlert({
            type: "error",
            title: "Error",
            message: error || "No se pudo iniciar sesión. Intenta de nuevo.",
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
               onCancel={alert.onCancel}
            />
         )}
         <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={20}
            contentContainerStyle={{ flexGrow: 1 }}
         >
            <View className="items-center pt-32 pb-8">
               <Text className="text-white text-2xl font-bold mt-3">Inicia Sesión</Text>
            </View>
            {/* Formulario */}
            <View className="px-7">
               {/* Correo Electrónico */}
               <View className="mb-6">
                  <Text className="text-white text-sm font-semibold mb-2">Correo Electrónico</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.email}
                     onChangeText={(text) => setFormData({ ...formData, email: text })}
                     placeholder="ejemplo@correo.com"
                     placeholderTextColor={Colors.movapp.placeholderTextColor}
                     keyboardType="email-address"
                     autoCapitalize="none"
                     editable={!loading}
                  />
               </View>

               {/* Contraseña */}
               <View className="mb-8">
                  <Text className="text-white text-sm font-semibold mb-2">Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.password}
                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                        placeholder="Escribe tu contraseña"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        secureTextEntry={!showPassword}
                        editable={!loading}
                     />
                     <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3"
                        disabled={loading}
                     >
                        <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Botón de Iniciar Sesión */}
               <TouchableOpacity
                  onPress={handleLogin}
                  className="py-4 rounded-xl items-center mb-6"
                  style={{ backgroundColor: Colors.movapp.primary }}
                  activeOpacity={0.8}
                  disabled={loading}
               >
                  {loading ? (
                     <ActivityIndicator color="white" />
                  ) : (
                     <Text className="text-white text-base font-bold">Iniciar Sesión</Text>
                  )}
               </TouchableOpacity>
            </View>
            {/* ¿Olvidaste tu contraseña? */}
            <View className="mb-8 px-7 mt-4">
               <TouchableOpacity
                  onPress={() => router.push("/(auth)/forgot-pass")}
                  activeOpacity={0.7}
                  disabled={loading}
               >
                  <Text
                     className="text-center text-base font-semibold underline"
                     style={{ color: Colors.movapp.primary }}
                  >
                     ¿Olvidaste tu contraseña?
                  </Text>
               </TouchableOpacity>
            </View>
            {/* ¿No tienes cuenta? */}
            <View className="flex-row justify-center mt-4">
               <Text className="text-white text-sm">¿No tienes una cuenta? </Text>
               <TouchableOpacity onPress={() => router.push("/(auth)/register")} activeOpacity={0.7} disabled={loading}>
                  <Text className="text-md font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     Regístrate
                  </Text>
               </TouchableOpacity>
            </View>
            {/* Acceso sin login */}
            <View className="flex-row justify-center  mb-8 mt-8">
               <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.7} disabled={loading}>
                  <Text className="text-sm font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     Puedes explorar el contenido sin crear una cuenta.
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAwareScrollView>
      </View>
   );
}
