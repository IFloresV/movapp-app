// app/(tabs)/conditions.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ConditionsScreen() {
   const router = useRouter();

   const handleAccept = () => {
      // Lógica para aceptar términos
      console.log("Términos aceptados");
      router.back();
   };

   const handleReject = () => {
      console.log("Términos rechazados");
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
                  Bienvenido a Movapp. Al acceder y utilizar nuestra aplicación, usted acepta cumplir con los siguientes
                  términos y condiciones. Por favor, lea los detenidamente. Si no está de acuerdo con alguna parte de
                  estos términos, no utilice nuestra aplicación.
               </Text>
            </View>

            {/* 2. Licencia de Uso */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">2. Licencia de Uso</Text>
               <Text className="text-white text-sm leading-6 mb-4">
                  Movapp le otorga una licencia limitada, no exclusiva, intransferible y revocable para utilizar la
                  aplicación estrictamente de acuerdo con estos Términos. Esta licencia es personal y no comercial.
               </Text>

               <Text className="text-white text-sm font-bold mb-2 p-2">2.1 Restricciones</Text>
               <Text className="text-white text-sm leading-6 p-2">
                  Usted no puede: modificar, copiar, distribuir, transmitir, mostrar, ejecutar, reproducir, publicar,
                  licenciar, crear trabajos derivados, transferir o vender información, software o servicios obtenidos
                  de la aplicación sin el consentimiento previo por escrito de Movapp.
               </Text>
            </View>

            {/* 3. Privacidad */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">3. Privacidad</Text>
               <Text className="text-white text-sm leading-6">
                  Su uso de Movapp está sujeto a la Política de Privacidad de la aplicación, que también rige la
                  aplicación e informa a los usuarios de nuestras prácticas de recopilación de datos. Al descargar datos
                  telemáticos, usted también acepta nuestra Política de Privacidad.
               </Text>
            </View>

            {/* 4. Terminación */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">4. Terminación</Text>
               <Text className="text-white text-sm leading-6">
                  Podemos rescindir o suspender su acceso a la aplicación de inmediato, sin previo aviso ni
                  responsabilidad, por cualquier motivo, incluyendo, entre otros, si incumple cualquiera de los
                  Términos. Tras la rescisión, su derecho a usar la aplicación cesará inmediatamente.
               </Text>
            </View>

            {/* 5. Cambios en los Términos */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">5. Cambios en los Términos</Text>
               <Text className="text-white text-sm leading-6">
                  Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en
                  cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso
                  antes de que los nuevos términos entren en vigor. Lo que constituye un cambio material se determinará
                  a nuestra entera discreción.
               </Text>
            </View>

            {/* 6. Contacto */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">6. Contacto</Text>
               <Text className="text-white text-sm leading-6 mb-2">
                  Si tiene alguna pregunta sobre estos Términos y Condiciones, no dude en ponerse en contacto con
                  nosotros a través de nuestro soporte dentro de la aplicación o en la dirección de correo electrónico
                  de contacto proporcionada en nuestra página web oficial.
               </Text>
            </View>

            {/* Propiedad Intelectual */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">7. Propiedad Intelectual</Text>
               <Text className="text-white text-sm leading-6">
                  La aplicación y su contenido original, características y funcionalidad son y seguirán siendo propiedad
                  exclusiva de Movapp y sus licenciantes. La aplicación está protegida por derechos de autor, marcas
                  comerciales y otras leyes.
               </Text>
            </View>

            {/* Limitación de Responsabilidad */}
            <View className="mb-6 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">8. Limitación de Responsabilidad</Text>
               <Text className="text-white text-sm leading-6">
                  En ningún caso Movapp, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán
                  responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin
                  limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles.
               </Text>
            </View>

            {/* Ley Aplicable */}
            <View className="mb-8 p-4">
               <Text className="text-purple-400 text-base font-bold mb-3">9. Ley Aplicable</Text>
               <Text className="text-white text-sm leading-6">
                  Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus
                  disposiciones sobre conflictos de leyes.
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
