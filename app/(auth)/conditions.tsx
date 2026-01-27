import { Colors } from "@/constants/Colors";
import { useRegister } from "@/context/RegisterContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConditionsScreen() {
   const router = useRouter();
   const { setAcceptedTerms } = useRegister();

   const handleAccept = () => {
      setAcceptedTerms(true);
      router.back();
   };

   const handleReject = () => {
      setAcceptedTerms(false);
      router.back();
   };

   return (
      <SafeAreaView className="flex-1 bg-black">
         <StatusBar style="light" />

         {/* Header */}
         <View className="px-4 pb-8 pt-4 border-t border-gray-800">
            <View className="flex-row items-center">
               <TouchableOpacity onPress={() => router.back()} className="mr-4">
                  <Feather name="arrow-left" size={24} color="white" />
               </TouchableOpacity>
               <Text className="text-white text-lg font-semibold">Términos y Condiciones</Text>
            </View>
         </View>

         {/* Content */}
         <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
            {/* 1. Introducción */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">1. Introducción</Text>
               <Text className="text-white text-sm leading-6">
                  Bienvenido a Movapp. El acceso al contenido informativo de la aplicación puede realizarse sin
                  necesidad de aceptar estos términos.
                  {"\n\n"}
                  La aceptación de los Términos y Condiciones es requerida únicamente para crear una cuenta y contratar
                  servicios de asesoría.
               </Text>
            </View>

            {/* 2. Licencia de Uso */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">2. Licencia de Uso</Text>
               <Text className="text-white text-sm leading-6 mb-4">
                  Movapp le otorga una licencia limitada, no exclusiva, intransferible y revocable para utilizar la
                  aplicación de acuerdo con estos Términos. Esta licencia es personal y no comercial.
               </Text>

               <Text className="text-white text-sm font-bold mb-2">2.1 Restricciones</Text>
               <Text className="text-white text-sm leading-6">
                  Usted no puede modificar, copiar, distribuir, reproducir o vender información, software o servicios
                  obtenidos de la aplicación sin autorización previa por escrito de Movapp.
               </Text>
            </View>

            {/* 3. Privacidad */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">3. Privacidad</Text>
               <Text className="text-white text-sm leading-6">
                  El uso de Movapp está sujeto a nuestra{" "}
                  <Text
                     className="text-purple-400 underline"
                     onPress={() => Linking.openURL("https://legal.movapp.com.mx/")}
                  >
                     Política de Privacidad
                  </Text>
                  , la cual describe cómo recopilamos, utilizamos y protegemos la información personal de los usuarios.
               </Text>
            </View>

            {/* 4. Terminación */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">4. Terminación</Text>
               <Text className="text-white text-sm leading-6">
                  Podemos suspender o terminar el acceso a las funciones de compra o asesoría si el usuario incumple
                  estos Términos. El acceso al contenido informativo no se verá afectado.
               </Text>
            </View>

            {/* 5. Cambios en los Términos */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">5. Cambios en los Términos</Text>
               <Text className="text-white text-sm leading-6">
                  Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones
                  entrarán en vigor una vez publicadas.
               </Text>
            </View>

            {/* 6. Contacto */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">6. Contacto</Text>
               <Text className="text-white text-sm leading-6">
                  Si tiene preguntas sobre estos Términos, puede contactarnos a través del soporte de la aplicación o
                  mediante la información disponible en nuestro sitio web oficial.
               </Text>
            </View>

            {/* 7. Propiedad Intelectual */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">7. Propiedad Intelectual</Text>
               <Text className="text-white text-sm leading-6">
                  La aplicación y su contenido son propiedad exclusiva de Movapp y están protegidos por las leyes de
                  propiedad intelectual.
               </Text>
            </View>

            {/* 8. Limitación de Responsabilidad */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">8. Limitación de Responsabilidad</Text>
               <Text className="text-white text-sm leading-6">
                  Movapp no será responsable por daños indirectos derivados del uso de la aplicación o de los servicios
                  de asesoría.
               </Text>
            </View>

            {/* 9. Ley Aplicable */}
            <View className="mb-8 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">9. Ley Aplicable</Text>
               <Text className="text-white text-sm leading-6">
                  Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos.
               </Text>
            </View>
         </ScrollView>

         {/* Buttons */}
         <View className="px-4 pb-8 pt-4 border-t border-gray-800">
            <TouchableOpacity
               onPress={handleAccept}
               className="rounded-xl py-4 mb-3 items-center"
               style={{ backgroundColor: Colors.movapp.primary }}
               activeOpacity={0.8}
            >
               <Text className="text-white text-base font-bold">Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity
               onPress={handleReject}
               className="border-2 rounded-xl py-4 items-center"
               style={{ borderColor: Colors.movapp.primary }}
               activeOpacity={0.8}
            >
               <Text className="text-base font-bold" style={{ color: Colors.movapp.primary }}>
                  Rechazar
               </Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   );
}
