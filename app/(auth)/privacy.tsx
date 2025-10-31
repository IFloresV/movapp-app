// app/(tabs)/privacy.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

import { useRegister } from "@/context/RegisterContext";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyScreen() {
   const router = useRouter();
   const { setAcceptedPrivacy } = useRegister();

   const handleAccept = () => {
      console.log("Términos aceptados");
      setAcceptedPrivacy(true);
      router.back();
   };

   const handleReject = () => {
      console.log("Términos rechazados");
      setAcceptedPrivacy(false);
      router.back();
   };

   return (
      <SafeAreaView className="flex-1 bg-black">
         {/* Header */}
         <View className="pt-12 pb-4 px-4 border-b border-gray-800">
            <View className="flex-row items-center">
               <TouchableOpacity onPress={() => router.back()} className="mr-4">
                  <Feather name="arrow-left" size={24} color="white" />
               </TouchableOpacity>
               <Text className="text-white text-lg font-semibold">Política de Privacidad</Text>
            </View>
         </View>

         {/* Content */}
         <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
            {/* Introducción */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Introducción</Text>
               <Text className="text-white text-base leading-6">
                  Bienvenido a Movapp. Tu privacidad es de suma importancia para nosotros. Esta Política de Privacidad
                  describe cómo recopilamos, usamos, procesamos y compartimos tu información personal en relación con tu
                  acceso y uso de la plataforma Movapp.
               </Text>
            </View>

            {/* Información que Recopilamos */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Información que Recopilamos</Text>
               <Text className="text-white text-base leading-6 mb-4">
                  Recopilamos información sobre ti cuando usas nuestros servicios. Esto incluye:
               </Text>

               <View className="space-y-3">
                  <View className="flex-row">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Información de Perfil:</Text> Tu nombre, dirección de correo
                        electrónico, contraseña, fecha de nacimiento, género y foto de perfil.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Información de Uso:</Text> Datos sobre cómo interactúas con la
                        aplicación, como las películas o series que ves, el tiempo de visualización, búsquedas y
                        preferencias.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Información del Dispositivo:</Text> Datos sobre el dispositivo
                        que usas para acceder a Movapp, incluyendo el modelo, sistema operativo, y tipo de navegador,
                        así como tu dirección IP y ubicación general desde la cual accedes al contenido.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Datos de Ubicación:</Text> Información de ubicación aproximada
                        basada en tu dirección IP para fines de licencia de contenido.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Comunicaciones:</Text> Registros de tus comunicaciones con
                        nosotros, incluyendo correos electrónicos de soporte y chats dentro de la aplicación.
                     </Text>
                  </View>
               </View>
            </View>

            {/* Uso de la Información */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Uso de la Información</Text>
               <Text className="text-white text-base leading-6 mb-4">Utilizamos la información recopilada para:</Text>

               <View className="space-y-3">
                  <View className="flex-row">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Proporcionar y mejorar nuestros servicios, incluyendo recomendaciones de contenido y
                        recomendaciones.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">Procesar tus suscripciones y pagos.</Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Comunicarnos contigo sobre tu cuenta, promociones y actualizaciones promocionales.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Detectar, prevenir y abordar fraudes, abusos o violaciones de nuestros Términos y Condiciones.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Realizar análisis y estudios para comprender mejor las preferencias de los usuarios.
                     </Text>
                  </View>
               </View>
            </View>

            {/* Compartir Información */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Compartir Información</Text>
               <Text className="text-white text-base leading-6 mb-4">
                  No compartimos tu información personal con terceros, excepto en las siguientes circunstancias:
               </Text>

               <View className="space-y-3">
                  <View className="flex-row">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Proveedores de Servicios:</Text> Compartimos información con
                        terceros que nos ayudan a operar la plataforma, como servicios de hosting, procesamiento de
                        pagos y análisis de datos.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Cumplimiento Legal:</Text> Podemos divulgar información si es
                        requerido por ley o en respuesta a procesos legales válidos.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        <Text className="font-semibold">Protección de Derechos:</Text> Para proteger los derechos,
                        propiedad o seguridad de Movapp, nuestros usuarios o el público.
                     </Text>
                  </View>
               </View>
            </View>

            {/* Seguridad */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Seguridad</Text>
               <Text className="text-white text-base leading-6">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra acceso
                  no autorizado, pérdida o alteración. Sin embargo, ninguna transmisión por internet es completamente
                  segura, por lo que no podemos garantizar la seguridad absoluta de tus datos.
               </Text>
            </View>

            {/* Tus Derechos */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Tus Derechos</Text>
               <Text className="text-white text-base leading-6 mb-4">Tienes derecho a:</Text>

               <View className="space-y-3">
                  <View className="flex-row">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Acceder y obtener una copia de tu información personal.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Solicitar la corrección de información inexacta.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Solicitar la eliminación de tu cuenta e información personal.
                     </Text>
                  </View>

                  <View className="flex-row mt-3">
                     <Text className="text-white mr-2">•</Text>
                     <Text className="text-white text-base leading-6 flex-1">
                        Oponerte al procesamiento de tus datos en ciertas circunstancias.
                     </Text>
                  </View>
               </View>
            </View>

            {/* Contacto */}
            <View className="mb-8">
               <Text className="text-purple-400 text-lg font-bold mb-3">Contacto</Text>
               <Text className="text-white text-base leading-6 mb-2">
                  Si tienes preguntas sobre esta Política de Privacidad, contáctanos en:
               </Text>
               <Text className="text-purple-400 text-base font-semibold">privacidad@movapp.org</Text>
            </View>

            {/* Fecha de actualización */}
            <View className="mb-8 pb-4">
               <Text className="text-gray-400 text-sm italic">Última actualización: Octubre 2025</Text>
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
