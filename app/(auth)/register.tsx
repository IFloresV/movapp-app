// app/(auth)/register.tsx
import Header from "@/components/Header";

import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import UserContext from "@/context/UserContext";

export default function RegisterScreen() {
   const { dispatchUser } = useContext(UserContext)!;
   const router = useRouter();
   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      postalCode: "",
      password: "",
      confirmPassword: "",
   });
   const [acceptedTerms, setAcceptedTerms] = useState(false);
   const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const handleRegister = async () => {
      // Validaciones
      if (!formData.fullName || !formData.email || !formData.phone || !formData.postalCode) {
         Alert.alert("Campos Incompletos", "Por favor completa todos los campos obligatorios");
         return;
      }

      if (!formData.password || formData.password.length < 8) {
         Alert.alert("Contraseña Débil", "La contraseña debe tener al menos 8 caracteres");
         return;
      }

      if (formData.password !== formData.confirmPassword) {
         Alert.alert("Error", "Las contraseñas no coinciden");
         return;
      }

      if (!acceptedTerms) {
         Alert.alert("Términos Requeridos", "Debes aceptar los Términos y Condiciones para continuar");
         return;
      }

      try {
         console.log("formData", formData);
         const payload = {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            // No guardes la contraseña real, esto es solo ejemplo
            id: Date.now(),
         };

         console.log("payload", payload);
         dispatchUser({ type: "LOGIN", payload });

         Alert.alert("Registro exitoso", "¡Bienvenido a Movapp!");

         // Llamar a tu API de registro
         // const response = await fetch("https://api.movapp.org/auth/register", {
         //    method: "POST",
         //    headers: { "Content-Type": "application/json" },
         //    body: JSON.stringify({
         //       ...formData,
         //       acceptedTerms: true,
         //       acceptedAt: new Date().toISOString(),
         //    }),
         // });

         // if (response.ok) {
         //    Alert.alert("¡Bienvenido!", "Tu cuenta ha sido creada exitosamente", [
         //       { text: "Comenzar", onPress: () => router.replace("/") },
         //    ]);
         // } else {
         //    const error = await response.json();
         //    Alert.alert("Error", error.message || "No se pudo crear la cuenta");
         // }
      } catch (error) {
         console.error("Error en registro:", error);
         Alert.alert("Error", "No se pudo crear la cuenta. Intenta de nuevo.");
      }
   };

   return (
      <View className="flex-1 bg-black">
         <Header showNotifications={false} showCart={false} />

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="items-center pt-2 pb-4">
               <Text className="text-white text-2xl font-bold mt-3">Crea tu cuenta</Text>
            </View>

            {/* Formulario */}
            <View className="px-7">
               {/* Nombre Completo */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Nombre Completo</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.fullName}
                     onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                     placeholder="Escribe tu nombre"
                     placeholderTextColor="#6b7280"
                  />
               </View>

               {/* Correo Electrónico */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Correo Electrónico</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.email}
                     onChangeText={(text) => setFormData({ ...formData, email: text })}
                     placeholder="ejemplo@correo.com"
                     placeholderTextColor="#6b7280"
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />
               </View>

               {/* Número de Teléfono */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Número de Teléfono</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.phone}
                     onChangeText={(text) => setFormData({ ...formData, phone: text })}
                     placeholder="Ej: +1 555 123 4567"
                     placeholderTextColor="#6b7280"
                     keyboardType="phone-pad"
                  />
               </View>

               {/* Código Postal */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Código Postal</Text>
                  <TextInput
                     className="bg-gray-800 text-white px-4 py-3 rounded-xl"
                     value={formData.postalCode}
                     onChangeText={(text) => setFormData({ ...formData, postalCode: text })}
                     placeholder="Ej: 12345"
                     placeholderTextColor="#6b7280"
                     keyboardType="number-pad"
                     maxLength={5}
                  />
               </View>

               {/* Contraseña */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.password}
                        onChangeText={(text) => setFormData({ ...formData, password: text })}
                        placeholder="Crea una contraseña segura"
                        placeholderTextColor="#6b7280"
                        secureTextEntry={!showPassword}
                     />
                     <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3">
                        <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Confirmar Contraseña */}
               <View className="mb-6">
                  <Text className="text-white text-sm font-semibold mb-2">Confirmar Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.confirmPassword}
                        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                        placeholder="Confirme tu contraseña"
                        placeholderTextColor="#6b7280"
                        secureTextEntry={!showConfirmPassword}
                     />
                     <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-3">
                        <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Checkbox Términos */}
               <TouchableOpacity
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  className="flex-row items-start mb-6"
                  activeOpacity={0.7}>
                  <View
                     className="w-5 h-5 rounded border-2 items-center justify-center mr-3 mt-0.5"
                     style={{
                        borderColor: acceptedTerms ? Colors.movapp.primary : "#6b7280",
                        backgroundColor: acceptedTerms ? Colors.movapp.primary : "transparent",
                     }}>
                     {acceptedTerms && <Feather name="check" size={14} color="white" />}
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-sm leading-5">
                        Acepto los{" "}
                        <Text
                           className="font-semibold underline"
                           style={{ color: Colors.movapp.primary }}
                           onPress={() => router.push("/(auth)/conditions")}>
                           Términos y Condiciones
                        </Text>
                     </Text>
                  </View>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => setAcceptedPrivacy(!acceptedPrivacy)}
                  className="flex-row items-start mb-6"
                  activeOpacity={0.7}>
                  <View
                     className="w-5 h-5 rounded border-2 items-center justify-center mr-3 mt-0.5"
                     style={{
                        borderColor: acceptedTerms ? Colors.movapp.primary : "#6b7280",
                        backgroundColor: acceptedTerms ? Colors.movapp.primary : "transparent",
                     }}>
                     {acceptedTerms && <Feather name="check" size={14} color="white" />}
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-sm leading-5">
                        Acepto la{" "}
                        <Text
                           className="font-semibold underline"
                           style={{ color: Colors.movapp.primary }}
                           onPress={() => router.push("/(auth)/privacy")}>
                           Política de Privacidad
                        </Text>
                     </Text>
                  </View>
               </TouchableOpacity>

               {/* Botón Registrarse */}
               <TouchableOpacity
                  onPress={handleRegister}
                  className="py-4 rounded-xl items-center mb-4"
                  style={{ backgroundColor: Colors.movapp.primary }}
                  activeOpacity={0.8}>
                  <Text className="text-white text-base font-bold">Registrarse</Text>
               </TouchableOpacity>

               {/* Link a Login */}
               <TouchableOpacity onPress={() => router.push("/(auth)/login")} className="items-center py-4 mb-8">
                  <Text className="text-white text-md">
                     ¿Ya tienes una cuenta?{" "}
                     <Text className="font-semibold" style={{ color: Colors.movapp.primary }}>
                        Inicia sesión
                     </Text>
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
}
