// app/(tabs)/privacy.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

import { useRegister } from "@/context/RegisterContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
         <StatusBar style="light" />

         {/* Header */}
         <View className="px-4 pb-8 pt-4 border-t border-gray-800">
            <View className="flex-row items-center">
               <TouchableOpacity onPress={() => router.back()} className="mr-4">
                  <Feather name="arrow-left" size={24} color="white" />
               </TouchableOpacity>
               <Text className="text-white text-lg font-semibold">Política de Privacidad</Text>
            </View>
         </View>

         {/* Content */}
         <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
            {/* 0. Intro */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">Política de Privacidad de Movapp</Text>
               <Text className="text-white text-sm leading-6 mb-3">Última actualización: enero de 2026</Text>
               <Text className="text-white text-sm leading-6">
                  Movapp (en adelante, “la App”) es una aplicación propiedad de Movapp (la “Empresa”), diseñada para
                  ofrecer contenido informativo y servicios de asesoría personalizada a través de WhatsApp.
               </Text>
               <Text className="text-white text-sm leading-6 mt-3">
                  La presente Política de Privacidad describe cómo recopilamos, usamos y protegemos la información
                  personal de los usuarios.
               </Text>
            </View>

            {/* 1. Uso de la aplicación sin registro */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">1. Uso de la aplicación sin registro</Text>
               <Text className="text-white text-sm leading-6">
                  La App puede utilizarse sin necesidad de crear una cuenta para acceder al contenido informativo.
                  {"\n\n"}
                  El registro es opcional y únicamente necesario para acceder al carrito de compras y contratar los
                  servicios de asesoría.
               </Text>
            </View>

            {/* 2. Información que recopilamos */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">2. Información que recopilamos</Text>
               <Text className="text-white text-sm leading-6 mb-3">
                  Solo recopilamos información personal cuando el usuario decide registrarse voluntariamente para
                  contratar un servicio.
               </Text>
               <Text className="text-white text-sm leading-6 mb-3">Los datos que podemos recopilar son:</Text>
               <View className="space-y-2">
                  <Text className="text-white text-sm leading-6">• Nombre completo</Text>
                  <Text className="text-white text-sm leading-6">• Correo electrónico</Text>
                  <Text className="text-white text-sm leading-6">• Número de teléfono</Text>
                  <Text className="text-white text-sm leading-6">• País</Text>
                  <Text className="text-white text-sm leading-6">• Código postal</Text>
               </View>
               <Text className="text-white text-sm leading-6 mt-3">
                  No solicitamos datos sensibles adicionales ni información innecesaria para la prestación del servicio.
               </Text>
            </View>

            {/* 3. Finalidad del uso de los datos */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">3. Finalidad del uso de los datos</Text>
               <Text className="text-white text-sm leading-6 mb-3">
                  La información recopilada se utiliza exclusivamente para:
               </Text>
               <View className="space-y-2">
                  <Text className="text-white text-sm leading-6">• Crear y administrar la cuenta del usuario</Text>
                  <Text className="text-white text-sm leading-6">• Gestionar el proceso de compra de servicios</Text>
                  <Text className="text-white text-sm leading-6">
                     • Canalizar al usuario con un asesor vía WhatsApp
                  </Text>
                  <Text className="text-white text-sm leading-6">
                     • Contactar al usuario en relación con la asesoría contratada
                  </Text>
                  <Text className="text-white text-sm leading-6">
                     • Determinar la asignación del asesor según país y zona
                  </Text>
               </View>
               <Text className="text-white text-sm leading-6 mt-3">
                  La App no realiza envíos físicos, ya que los servicios ofrecidos son servicios digitales de asesoría.
               </Text>
            </View>

            {/* 4. Uso del número telefónico */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">4. Uso del número telefónico</Text>
               <Text className="text-white text-sm leading-6 mb-3">
                  El número telefónico es requerido únicamente para:
               </Text>
               <View className="space-y-2">
                  <Text className="text-white text-sm leading-6">
                     • Establecer comunicación directa entre el usuario y el asesor asignado
                  </Text>
                  <Text className="text-white text-sm leading-6">
                     • Brindar el servicio de asesoría a través de WhatsApp
                  </Text>
               </View>
               <Text className="text-white text-sm leading-6 mt-3">
                  El número telefónico no se utiliza con fines publicitarios ni se comparte con terceros ajenos al
                  servicio.
               </Text>
            </View>

            {/* 5. Compartición de información */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">5. Compartición de información</Text>
               <Text className="text-white text-sm leading-6 mb-3">
                  No vendemos, alquilamos ni compartimos información personal con terceros, salvo cuando sea
                  estrictamente necesario para:
               </Text>
               <View className="space-y-2">
                  <Text className="text-white text-sm leading-6">• Procesar pagos</Text>
                  <Text className="text-white text-sm leading-6">• Prestar el servicio de asesoría solicitado</Text>
               </View>
               <Text className="text-white text-sm leading-6 mt-3">
                  En dichos casos, la información compartida se limita al mínimo indispensable.
               </Text>
            </View>

            {/* 6. Conservación de la información */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">6. Conservación de la información</Text>
               <Text className="text-white text-sm leading-6">
                  Los datos personales se conservan únicamente durante el tiempo necesario para cumplir con las
                  finalidades descritas en esta política o mientras el usuario mantenga una cuenta activa.
               </Text>
            </View>

            {/* 7. Eliminación de datos y derechos del usuario */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">
                  7. Eliminación de datos y derechos del usuario
               </Text>
               <Text className="text-white text-sm leading-6 mb-3">
                  El usuario puede solicitar en cualquier momento:
               </Text>
               <View className="space-y-2">
                  <Text className="text-white text-sm leading-6">• Acceso a sus datos</Text>
                  <Text className="text-white text-sm leading-6">• Corrección de su información</Text>
                  <Text className="text-white text-sm leading-6">• Eliminación de su cuenta y datos personales</Text>
               </View>
               <Text className="text-white text-sm leading-6 mt-3">Para ello, puede escribir a:</Text>
               <Text className="text-purple-400 text-base font-semibold mt-2">privacidad@movapp.org</Text>
            </View>

            {/* 8. Seguridad de la información */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">8. Seguridad de la información</Text>
               <Text className="text-white text-sm leading-6">
                  Implementamos medidas técnicas y organizativas razonables para proteger la información personal contra
                  accesos no autorizados, pérdida o uso indebido.
               </Text>
            </View>

            {/* 9. Cambios a esta política */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">9. Cambios a esta política</Text>
               <Text className="text-white text-sm leading-6">
                  La Empresa se reserva el derecho de modificar esta Política de Privacidad. Cualquier cambio será
                  publicado en esta misma página y entrará en vigor a partir de su publicación.
               </Text>
            </View>

            {/* 10. Contacto */}
            <View className="mb-8 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">10. Contacto</Text>
               <Text className="text-white text-sm leading-6 mb-2">
                  Si tienes dudas sobre esta Política de Privacidad o el tratamiento de tus datos, puedes contactarnos
                  en:
               </Text>
               <Text className="text-purple-400 text-base font-semibold">privacidad@movapp.org</Text>
            </View>

            <View className="mb-8 pb-4">
               <Text className="text-gray-400 text-sm italic">Última actualización: Enero 2026</Text>
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
