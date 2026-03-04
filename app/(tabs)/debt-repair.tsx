import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, View } from "react-native";

const DEBT_REPAIR_URL = "https://movapp.org/reparadora-deudas/";

export default function DebtRepairScreen() {
   const handleOpenWeb = async () => {
      try {
         await Linking.openURL(DEBT_REPAIR_URL);
      } catch (error) {
         console.log("Error opening URL:", error);
      }
   };

   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="px-4 pt-6 pb-10">
            {/* Header */}
            <View className="bg-movapp-linkBackgroundHome rounded-3xl p-6 mb-6">
               <Text className="text-white text-3xl font-extrabold mb-2 text-center">Imagina tu vida sin deudas</Text>
               <Text className="text-gray-200 text-base text-center">
                  Detener el acoso es solo el primer paso. Cuando existen deudas legales que ya no puedes manejar, una
                  reparadora de deudas especializada puede ayudarte a construir un plan realista para salir adelante.
               </Text>
            </View>

            {/* Qué es una reparadora de deudas */}
            <View className="bg-movapp-linkBackground rounded-3xl p-5 mb-5">
               <Text className="text-white text-xl font-bold mb-3">¿Qué es una reparadora de deudas?</Text>
               <Text className="text-gray-200 text-base mb-2">
                  Es un servicio profesional que te acompaña cuando tus deudas legales se volvieron difíciles de pagar.
                  Analiza tu situación, propone acuerdos con tus acreedores y diseña un plan para liquidar de forma
                  ordenada.
               </Text>
               <Text className="text-gray-200 text-base">
                  En estos procesos, la prioridad es recuperar tu tranquilidad primero y luego reconstruir tu
                  estabilidad financiera paso a paso.
               </Text>
            </View>

            {/* Beneficios sección */}
            <View className="bg-movapp-linkBackground rounded-3xl p-5 mb-5">
               <Text className="text-white text-xl font-bold mb-4">
                  A través de una reparadora de deudas puedes acceder a:
               </Text>

               {[
                  "Revisión y reestructuración de deudas legales",
                  "Planes de liquidación acordes a tu capacidad de pago",
                  "Posibilidad de negociar descuentos importantes sobre el monto total",
                  "Acompañamiento durante todo el proceso para que no estés solo",
                  "Orden financiero para que puedas comenzar de nuevo",
               ].map((item, index) => (
                  <View key={index} className="flex-row items-start mb-3">
                     <View className="mt-1 mr-3 bg-movapp-linkIcon/20 rounded-full p-1.5">
                        <Feather name="check" size={14} color={Colors.movapp.primary} />
                     </View>
                     <Text className="text-gray-200 text-base flex-1">{item}</Text>
                  </View>
               ))}
            </View>

            {/* Rol de Movapp */}
            <View className="bg-movapp-linkBackground rounded-3xl p-5 mb-5">
               <Text className="text-white text-xl font-bold mb-3">¿Qué hace Movapp en este proceso?</Text>
               <Text className="text-gray-200 text-base mb-2">
                  Movapp se enfoca en detener el acoso digital, acompañarte emocionalmente y ayudarte a recuperar la
                  calma. Cuando identificamos que además necesitas reorganizar deudas legales, podemos orientarte hacia
                  una reparadora de deudas especializada como Curadeuda.
               </Text>
               <Text className="text-gray-200 text-base">
                  Movapp no presta directamente servicios de reparación de deuda ni negocia con acreedores. Los procesos
                  de reparación los lleva a cabo la empresa especializada bajo sus propios términos y condiciones.
               </Text>
            </View>

            {/* CTA */}
            <View className="bg-movapp-linkBackgroundHome rounded-3xl p-6">
               <Text className="text-white text-xl font-bold mb-3 text-center">
                  Da el siguiente paso con tranquilidad
               </Text>
               <Text className="text-gray-200 text-base mb-5 text-center">
                  Si tu situación incluye deudas legales difíciles de manejar, puedes conocer más sobre las opciones de
                  reparación de deudas en nuestro aliado especializado.
               </Text>

               <TouchableOpacity
                  onPress={handleOpenWeb}
                  activeOpacity={0.8}
                  className="bg-white rounded-2xl py-4 px-4 flex-row items-center justify-center">
                  <Feather name="external-link" size={20} color={Colors.movapp.background} />
                  <Text className="text-movapp-bgTabsNav text-base font-bold ml-2">Ver más información en la web</Text>
               </TouchableOpacity>
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
