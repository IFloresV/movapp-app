// app/(auth)/register.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect, useState } from "react";
import {
   ActivityIndicator,
   Alert,
   FlatList,
   Modal,
   Platform,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Service from "@/api/AuthService";
import { useConfig } from "@/context/ConfigContext";
import { useRegister } from "@/context/RegisterContext";
import UserContext from "@/context/UserContext";
import { useAxios } from "@/hooks/useAxios";

import { getFlag } from "@/utils/Flags";

export default function RegisterScreen() {
   const { dispatchUser } = useContext(UserContext)!;
   const { acceptedTerms, setAcceptedTerms, acceptedPrivacy, setAcceptedPrivacy } = useRegister();

   const { config, reloadPaises } = useConfig();
   const { paises } = config;
   const router = useRouter();

   const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      phone: "",
      countryId: 1,
      postalCode: "",
      password: "",
      confirmPassword: "",
   });

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [showCountryModal, setShowCountryModal] = useState(false);

   const [registerFetch, data, error, , loading, , resetData] = useAxios(Service.register);

   useEffect(() => {
      if (paises.length === 0 || !config.loaded) {
         reloadPaises();
      }
   }, []);

   useEffect(() => {
      if (paises.length > 0 && formData.countryId === 1) {
         const mexico = paises.find((p) => p.codigo_pais === "MX");
         if (mexico) {
            setFormData((prev) => ({ ...prev, countryId: mexico.id }));
         }
      }
   }, [paises]);

   useEffect(() => {
      if (!data) return;

      if (data.success) {
         (async () => {
            dispatchUser({ type: "LOGIN", payload: data.user });
            clearStates();

            Alert.alert("Registro exitoso", "¡Bienvenido a Movapp!", [
               { text: "Comenzar", onPress: () => router.replace("/") },
            ]);

            resetData();
         })();
      } else {
         const messages = data.errors ? data.errors.map((e: { msg: string }) => e.msg).join("\n") : data.message;
         if (messages) Alert.alert("Error", messages);
         resetData();
      }
   }, [data]);

   const clearStates = () => {
      setFormData({
         fullName: "",
         email: "",
         phone: "",
         countryId: 1,
         postalCode: "",
         password: "",
         confirmPassword: "",
      });
      setAcceptedTerms(false);
      setAcceptedPrivacy(false);
   };

   const getDeviceId = async (): Promise<string> => {
      let deviceId = await SecureStore.getItemAsync("deviceId");
      if (!deviceId) {
         deviceId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
         await SecureStore.setItemAsync("deviceId", deviceId);
      }
      return deviceId;
   };

   const handleRegister = async () => {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.postalCode) {
         Alert.alert("Campos incompletos", "Por favor completa todos los campos obligatorios");
         return;
      }
      if (!formData.password || formData.password.length < 8) {
         Alert.alert("Contraseña débil", "La contraseña debe tener al menos 8 caracteres");
         return;
      }
      if (formData.password !== formData.confirmPassword) {
         Alert.alert("Error", "Las contraseñas no coinciden");
         return;
      }
      if (!acceptedTerms) {
         Alert.alert("Términos requeridos", "Debes aceptar los Términos y Condiciones para continuar");
         return;
      }
      if (!acceptedPrivacy) {
         Alert.alert("Privacidad requerida", "Debes aceptar la Política de Privacidad");
         return;
      }

      const deviceId = await getDeviceId();
      const device = Device.deviceName || "Unknown";
      const platform = Platform.OS;
      const model = Device.modelName || "Unknown";
      const appVersion = Constants.expoConfig?.version || "1.0.0";

      const payload = {
         nombre: formData.fullName,
         email: formData.email,
         telefono: formData.phone,
         pais_id: formData.countryId,
         cp: formData.postalCode,
         password: formData.password,
         deviceId,
         device,
         platform,
         model,
         appVersion,
      };

      try {
         await registerFetch(payload);
      } catch (err) {
         console.error("Error en registro:", err);
         Alert.alert("Error", error || "No se pudo crear la cuenta. Intenta de nuevo.");
      }
   };

   const handleChange = (name: string, value: string | number) => setFormData({ ...formData, [name]: value });

   const selectedCountry = paises.find((p) => p.id === formData.countryId);

   // const getFlag = (countryCode: string) => {
   //    const codePoints = countryCode
   //       .toUpperCase()
   //       .split("")
   //       .map((char) => 127397 + char.charCodeAt(0));
   //    return String.fromCodePoint(...codePoints);
   // };

   return (
      <View className="flex-1 bg-black">
         <Header showNotifications={false} showCart={false} logoType={2} />

         <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            extraScrollHeight={20}
            contentContainerStyle={{ flexGrow: 1 }}
         >
            <View className="items-center pt-2 pb-4">
               <Text className="text-white text-2xl font-bold mt-3">Crea tu cuenta</Text>
            </View>

            <View className="px-7">
               {/* Nombre */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Nombre Completo</Text>
                  <TextInput
                     className="bg-movapp-inputBackground text-white px-4 py-3 rounded-xl"
                     value={formData.fullName}
                     onChangeText={(text) => handleChange("fullName", text)}
                     placeholder="Escribe tu nombre"
                     placeholderTextColor={Colors.movapp.placeholderTextColor}
                  />
               </View>

               {/* Email */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Correo Electrónico</Text>
                  <TextInput
                     className="bg-movapp-inputBackground text-white px-4 py-3 rounded-xl"
                     value={formData.email}
                     onChangeText={(text) => handleChange("email", text)}
                     placeholder="ejemplo@correo.com"
                     placeholderTextColor={Colors.movapp.placeholderTextColor}
                     keyboardType="email-address"
                     autoCapitalize="none"
                  />
               </View>

               <View className="flex-row mb-4 gap-3">
                  {/* País */}
                  <View className="flex-1">
                     <Text className="text-white text-sm font-semibold mb-2">País</Text>
                     <TouchableOpacity
                        onPress={() => setShowCountryModal(true)}
                        className="bg-movapp-inputBackground px-4 py-3 rounded-xl flex-row items-center justify-between"
                        disabled={paises.length === 0}
                     >
                        {paises.length === 0 ? (
                           <ActivityIndicator size="small" color="#fff" />
                        ) : selectedCountry ? (
                           <>
                              <Text className="text-white text-base">
                                 {getFlag(selectedCountry.codigo_pais)} - {selectedCountry.pais}
                              </Text>
                              <Feather name="chevron-down" size={20} color={Colors.movapp.primary} />
                           </>
                        ) : (
                           <Text className="text-gray-400">Seleccionar</Text>
                        )}
                     </TouchableOpacity>
                  </View>

                  {/* Código Postal */}
                  <View className="flex-1">
                     <Text className="text-white text-sm font-semibold mb-2">Código Postal</Text>
                     <TextInput
                        className="bg-movapp-inputBackground text-white px-4 py-3 rounded-xl"
                        value={formData.postalCode}
                        onChangeText={(text) => handleChange("postalCode", text)}
                        placeholder="12345"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        keyboardType="number-pad"
                        maxLength={6}
                     />
                  </View>
               </View>

               {/* Teléfono */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Número de Teléfono</Text>
                  <View className="flex-row items-center bg-movapp-inputBackground rounded-xl">
                     {/* Prefijo del país */}
                     <View className="px-4 py-3 border-r border-gray-700">
                        <Text className="text-white text-base font-semibold">
                           {selectedCountry?.codigo_telefono || "+52"}
                        </Text>
                     </View>

                     {/* Input del teléfono */}
                     <TextInput
                        className="flex-1 text-white px-4 py-3"
                        value={formData.phone}
                        onChangeText={(text) => handleChange("phone", text.replace(/[^0-9]/g, ""))}
                        placeholder="5511223344"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        keyboardType="number-pad"
                        maxLength={12}
                     />
                  </View>
               </View>

               {/* Contraseña */}
               <View className="mb-4">
                  <Text className="text-white text-sm font-semibold mb-2">Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-movapp-inputBackground text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.password}
                        onChangeText={(text) => handleChange("password", text)}
                        placeholder="Crea una contraseña segura"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
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

               {/* Confirmar Contraseña */}
               <View className="mb-6">
                  <Text className="text-white text-sm font-semibold mb-2">Confirmar Contraseña</Text>
                  <View className="relative">
                     <TextInput
                        className="bg-movapp-inputBackground text-white px-4 py-3 rounded-xl pr-12"
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange("confirmPassword", text)}
                        placeholder="Confirme tu contraseña"
                        placeholderTextColor={Colors.movapp.placeholderTextColor}
                        secureTextEntry={!showConfirmPassword}
                     />
                     <TouchableOpacity
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-3"
                     >
                        <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Términos */}
               <TouchableOpacity
                  onPress={() => setAcceptedTerms(!acceptedTerms)}
                  className="flex-row items-start mb-6"
                  activeOpacity={0.7}
               >
                  <View
                     className="w-5 h-5 rounded border-2 items-center justify-center mr-3 mt-0.5"
                     style={{
                        borderColor: acceptedTerms ? Colors.movapp.primary : "#6b7280",
                        backgroundColor: acceptedTerms ? Colors.movapp.primary : "transparent",
                     }}
                  >
                     {acceptedTerms && <Feather name="check" size={14} color="white" />}
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-sm leading-5">
                        Acepto los{" "}
                        <Text
                           className="font-semibold underline"
                           style={{ color: Colors.movapp.primary }}
                           onPress={() => router.push("/(auth)/conditions")}
                        >
                           Términos y Condiciones
                        </Text>
                     </Text>
                  </View>
               </TouchableOpacity>

               {/* Privacidad */}
               <TouchableOpacity
                  onPress={() => setAcceptedPrivacy(!acceptedPrivacy)}
                  className="flex-row items-start mb-6"
                  activeOpacity={0.7}
               >
                  <View
                     className="w-5 h-5 rounded border-2 items-center justify-center mr-3 mt-0.5"
                     style={{
                        borderColor: acceptedPrivacy ? Colors.movapp.primary : "#6b7280",
                        backgroundColor: acceptedPrivacy ? Colors.movapp.primary : "transparent",
                     }}
                  >
                     {acceptedPrivacy && <Feather name="check" size={14} color="white" />}
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-sm leading-5">
                        Acepto la{" "}
                        <Text
                           className="font-semibold underline"
                           style={{ color: Colors.movapp.primary }}
                           onPress={() => router.push("/(auth)/privacy")}
                        >
                           Política de Privacidad
                        </Text>
                     </Text>
                  </View>
               </TouchableOpacity>

               {/* Botón */}
               <TouchableOpacity
                  onPress={handleRegister}
                  className="py-4 rounded-xl items-center mb-4"
                  style={{ backgroundColor: Colors.movapp.primary }}
                  activeOpacity={0.8}
               >
                  {loading ? (
                     <ActivityIndicator color="white" />
                  ) : (
                     <Text className="text-white text-base font-bold">Registrarse</Text>
                  )}
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
         </KeyboardAwareScrollView>

         {/* Modal de Selección de País */}
         <Modal
            visible={showCountryModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowCountryModal(false)}
         >
            <View className="flex-1 justify-end bg-black/50">
               <View className="bg-movapp-background rounded-t-3xl max-h-[70%]">
                  {/* Header del Modal */}
                  <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-800">
                     <Text className="text-white text-lg font-bold">Selecciona tu país</Text>
                     <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                        <Feather name="x" size={24} color="#fff" />
                     </TouchableOpacity>
                  </View>

                  {/* Lista de Países */}
                  <FlatList
                     data={paises}
                     keyExtractor={(item) => item.id.toString()}
                     renderItem={({ item }) => (
                        <TouchableOpacity
                           onPress={() => {
                              handleChange("countryId", item.id);
                              setShowCountryModal(false);
                           }}
                           className="px-6 py-4 border-b border-gray-800 flex-row items-center justify-between"
                           activeOpacity={0.7}
                        >
                           <View className="flex-row items-center flex-1">
                              <Text className="text-3xl mr-3">{getFlag(item.codigo_pais)}</Text>
                              <View className="flex-1">
                                 <Text className="text-white text-base font-semibold">{item.pais}</Text>
                                 <Text className="text-gray-400 text-sm">
                                    {item.codigo_pais} • {item.codigo_telefono}
                                 </Text>
                              </View>
                           </View>
                           {formData.countryId === item.id && (
                              <Feather name="check" size={24} color={Colors.movapp.primary} />
                           )}
                        </TouchableOpacity>
                     )}
                  />
               </View>
            </View>
         </Modal>
      </View>
   );
}
