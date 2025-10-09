// app/(auth)/register.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
   const router = useRouter();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const [showPassword, setShowPassword] = useState(false);

   const handleLogin = async () => {
      // Validaciones
      if (!formData.email || !formData.password) {
         Alert.alert("Campos Incompletos", "Por favor completa todos los campos obligatorios");
         return;
      }

      try {
         // Llamar a tu API de inicio de sesión
         // const response = await fetch("https://api.movapp.org/auth/login", {
         //    method: "POST",
         //    headers: { "Content-Type": "application/json" },
         //    body: JSON.stringify(formData),
         // });

         // if (response.ok) {
         //    Alert.alert("¡Bienvenido de nuevo!", "Has iniciado sesión exitosamente", [
         //       { text: "Comenzar", onPress: () => router.replace("/") },
         //    ]);
         // } else {
         //    const error = await response.json();
         //    Alert.alert("Error", error.message || "No se pudo iniciar sesión");
         // }

         console.log("formData", formData);
      } catch (error) {
         console.error("Error en inicio de sesión:", error);
         Alert.alert("Error", "No se pudo iniciar sesión. Intenta de nuevo.");
      }
   };

   return (
      <View className="flex-1 bg-movapp-background">
         <Header showNotifications={false} showCart={false} />
         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
                     placeholderTextColor="#6b7280"
                     keyboardType="email-address"
                     autoCapitalize="none"
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
                        placeholderTextColor="#6b7280"
                        secureTextEntry={!showPassword}
                     />
                     <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-3"
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
               >
                  <Text className="text-white text-base font-bold">Iniciar Sesión</Text>
               </TouchableOpacity>
            </View>

            <View className="flex-1">
               <TouchableOpacity onPress={() => router.push("/(auth)/forgot-pass")} activeOpacity={0.7}>
                  <Text
                     className="text-center text-base font-semibold underline"
                     style={{ color: Colors.movapp.primary }}
                  >
                     ¿Olvidaste tu contraseña?
                  </Text>
               </TouchableOpacity>
            </View>

            <View className="flex-row justify-center mt-5">
               <Text className="text-white text-sm">¿No tienes una cuenta? </Text>
               <TouchableOpacity onPress={() => router.push("/(auth)/register")} activeOpacity={0.7}>
                  <Text className="text-md font-semibold underline" style={{ color: Colors.movapp.primary }}>
                     Regístrate
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </View>
   );
}
