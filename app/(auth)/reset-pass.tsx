// app/(auth)/reset-pass.tsx
import AlertComponent from "@/components/Alert";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Service from "@/api/AuthService";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { CartContext } from "@/context/CartContext";
import { useAxios } from "@/hooks/useAxios";

export default function ResetPasswordScreen() {
   const [alert, setAlert] = useState<{
      type: "success" | "error" | "warning" | "info";
      title: string;
      message: string;
      onlyAccept?: boolean;
      onAccept?: () => void;
      onCancel?: () => void;
      acceptText?: string;
      cancelText?: string;
   } | null>(null);
   const { email } = useLocalSearchParams();
   const router = useRouter();
   const { login } = useApp();
   const cartContext = useContext(CartContext);

   const [formData, setFormData] = useState({
      code: "",
      newPassword: "",
      confirmPassword: "",
   });
   const [showPassword, setShowPassword] = useState({
      new: false,
      confirm: false,
   });

   const [resetPasswordFetch, data, error, , loading, , resetData] = useAxios(Service.resetPassword);

   // ✅ Procesar respuesta solo cuando cambie data
   useEffect(() => {
      if (!data) return;

      const processResponse = async () => {
         if (data.success) {
            try {
               const accessToken = data.accessToken;
               const refreshToken = data.device?.refresh_hash;

               if (!accessToken || !refreshToken) {
                  setAlert({
                     type: "error",
                     title: "Error",
                     message: "No se recibieron los tokens de autenticación",
                     onlyAccept: true,
                     onAccept: () => setAlert(null),
                  });
                  return;
               }

               if (cartContext?.clearCart) {
                  await cartContext.clearCart();
               }

               await login(data.user, accessToken, refreshToken);

               setAlert({
                  type: "success",
                  title: "¡Contraseña Actualizada!",
                  message: "Tu contraseña ha sido cambiada exitosamente",
                  onlyAccept: true,
                  acceptText: "Continuar",
                  onAccept: () => {
                     setAlert(null);
                     router.replace("/");
                  },
               });
            } catch (err) {
               setAlert({
                  type: "error",
                  title: "Error",
                  message: "No se pudo completar el proceso",
                  onlyAccept: true,
                  onAccept: () => setAlert(null),
               });
            } finally {
               resetData();
            }
         } else {
            const messages = data.errors
               ? data.errors.map((e: { msg: string }) => e.msg).join("\n")
               : data.message || "No se pudo cambiar la contraseña";

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
      };

      processResponse();
   }, [data]);

   const getDeviceId = async (): Promise<string> => {
      let deviceId = await SecureStore.getItemAsync("deviceId");
      if (!deviceId) {
         deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
         await SecureStore.setItemAsync("deviceId", deviceId);
      }
      return deviceId;
   };

   const handleSubmit = async () => {
      // Validaciones
      if (!formData.code || !formData.newPassword || !formData.confirmPassword) {
         setAlert({
            type: "error",
            title: "Campos Incompletos",
            message: "Por favor completa todos los campos",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
         setAlert({
            type: "error",
            title: "Error",
            message: "Las contraseñas no coinciden",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }

      if (formData.newPassword.length < 6) {
         setAlert({
            type: "error",
            title: "Contraseña débil",
            message: "La contraseña debe tener al menos 6 caracteres",
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
         email: typeof email === "string" ? email : "",
         code: formData.code.toUpperCase().trim(),
         password: formData.newPassword,
         deviceId,
         device,
         platform,
         model,
         appVersion,
      };

      try {
         await resetPasswordFetch(payload);
      } catch (err) {
         console.log("❌ Error en reset password:", err);
         setAlert({
            type: "error",
            title: "Error",
            message: error || "No se pudo cambiar la contraseña. Intenta de nuevo.",
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
               acceptText={alert.acceptText}
               cancelText={alert.cancelText}
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
            <View className="items-center pt-20 pb-8">
               <Feather name="shield" size={48} color={Colors.movapp.primary} />
               <Text className="text-white text-2xl font-bold mt-3">Restablecer Contraseña</Text>
               <Text className="text-gray-400 text-sm text-center mt-2 px-8">
                  Ingresa el código que recibiste en tu correo
               </Text>
            </View>

            <View className="px-7">
               {/* Email (read-only) */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Correo Electrónico</Text>
                  <View className="bg-gray-800 px-4 py-3 rounded-xl">
                     <Text className="text-gray-400">{email}</Text>
                  </View>
               </View>

               {/* Código de Verificación */}
               <View className="mb-6">
                  <Text className="text-white text-sm font-semibold mb-2">Código de Verificación</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.code}
                     onChangeText={(text) => setFormData({ ...formData, code: text.toUpperCase() })}
                     placeholder="Ingresa el código de 5 dígitos"
                     placeholderTextColor={Colors.movapp.placeholderTextColor}
                     autoCapitalize="characters"
                     maxLength={5}
                     editable={!loading}
                  />
               </View>

               {/* Nueva Contraseña */}
               <View className="mb-6">
                  <Text className="text-white text-sm font-semibold mb-2">Nueva Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.newPassword}
                        onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                        placeholder="Mínimo 6 caracteres"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        secureTextEntry={!showPassword.new}
                        editable={!loading}
                     />
                     <TouchableOpacity
                        onPress={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                        className="absolute right-4 top-3"
                        disabled={loading}
                     >
                        <Feather name={showPassword.new ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Confirmar Contraseña */}
               <View className="mb-8">
                  <Text className="text-white text-sm font-semibold mb-2">Confirmar Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.confirmPassword}
                        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                        placeholder="Repite la contraseña"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        secureTextEntry={!showPassword.confirm}
                        editable={!loading}
                     />
                     <TouchableOpacity
                        onPress={() =>
                           setShowPassword({
                              ...showPassword,
                              confirm: !showPassword.confirm,
                           })
                        }
                        className="absolute right-4 top-3"
                        disabled={loading}
                     >
                        <Feather name={showPassword.confirm ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Botón de Cambiar Contraseña */}
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
                     <Text className="text-white text-base font-bold">Cambiar Contraseña</Text>
                  )}
               </TouchableOpacity>
            </View>

            {/* Volver a Inicio de Sesión */}
            <View className="flex-row justify-center mt-10 mb-8">
               <Text className="text-white text-sm">¿Ya tienes tu contraseña? </Text>
               <TouchableOpacity onPress={() => router.push("/(auth)/login")} activeOpacity={0.7} disabled={loading}>
                  <Text className="text-md font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     Inicia Sesión
                  </Text>
               </TouchableOpacity>
            </View>
         </KeyboardAwareScrollView>
      </View>
   );
}
