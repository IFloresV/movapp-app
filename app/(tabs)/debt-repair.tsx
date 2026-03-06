import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Colors } from "@/constants/Colors";
import { getImage } from "@/utils/Images";
import { Feather } from "@expo/vector-icons";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";

const DEBT_REPAIR_URL = "https://registro.curadeuda.com/movapp/";

const openUrl = async (url: string) => {
   const supported = await Linking.canOpenURL(url);
   if (supported) {
      await Linking.openURL(url);
   }
};

const DebtRepairButton = () => (
   <TouchableOpacity
      onPress={() => openUrl(DEBT_REPAIR_URL)}
      activeOpacity={0.8}
      className="bg-movapp-primary py-4 rounded-xl items-center mb-3">
      <Text className="text-white text-md font-bold ml-2">Comienza ya</Text>
   </TouchableOpacity>
);

export default function DebtRepairScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="px-4 pt-6 pb-10">
            {/* Header */}
            <Text className="text-white text-xl font-extrabold mb-4 text-center">Reparadora de deuda</Text>
            <View className="bg-movapp-linkBackgroundHome rounded-3xl p-6 mb-6">
               <Text className="text-white text-xl font-extrabold mb-2 text-center">Imagina tu vida sin deudas</Text>
               <Text className="text-gray-200 text-sm text-center mb-1" style={{ textAlign: "justify" }}>
                  Detener el acoso es el primer paso. Pero muchas personas también cargan con deudas reales que se
                  volvieron imposibles de manejar.
               </Text>
               <Text className="text-gray-200 text-sm text-center" style={{ textAlign: "justify" }}>
                  En Movapp nos enfocamos en protegerte del acoso digital y devolverte la tranquilidad. Y cuando la
                  situación lo requiere, podemos orientarte hacia una opción especializada en reparación de deudas como
                  <Text className="text-movapp-primary font-semibold "> Curadeuda</Text>.
               </Text>
            </View>

            {/* Beneficios sección */}
            <View className="bg-movapp-linkBackground rounded-3xl p-5 mb-5">
               <Text className="text-white text-lg font-bold mb-4">
                  A través de este tipo de solución puedes acceder a:
               </Text>

               {[
                  "Restructuración de deudas legales",
                  "Planes reales de liquidación",
                  "Liquida tus deudas hasta con un 70% de descuento",
                  "Acompañamiento durante el proceso",
                  "Orden financiero para comenzar de nuevo",
               ].map((item, index) => (
                  <View key={index} className="flex-row items-start mb-3">
                     <View className="mt-1 mr-3 bg-movapp-linkIcon/20 rounded-full p-1.5">
                        <Feather name="check" size={14} color={Colors.movapp.primary} />
                     </View>
                     <Text className="text-gray-200 text-sm flex-1" style={{ textAlign: "justify" }}>
                        {item}
                     </Text>
                  </View>
               ))}
            </View>

            <View className="w-11/12 max-w-md self-center items-center mb-6 rounded-xl overflow-hidden">
               <Image source={getImage("REPARADORA DEUDA - HERO")} className="w-full h-44" resizeMode="cover" />
            </View>

            <View className="rounded-xl p-6 mb-6">
               <DebtRepairButton />
            </View>

            {/* Historias de éxito */}
            <View className="bg-movapp-linkBackground rounded-xl p-5 mb-5">
               <Text className="text-white text-lg font-bold mb-4">Historias de éxito</Text>

               <ScrollView style={{ maxHeight: 260 }} showsVerticalScrollIndicator={false}>
                  {[
                     {
                        name: "Cynthia Alemán",
                        text: "Siempre atentos y activos por tu libertad financiera.",
                     },
                     {
                        name: "Diego Rodríguez",
                        text: "Te atienden y guían todo el tiempo claros y concisos.",
                     },
                     {
                        name: "Edgar David",
                        text: "Son increíbles negociando deudas y ayudando a mejorar tu historial financiero.",
                     },
                     {
                        name: "Ruth Gonzalez",
                        text: "Ya liquidé una deuda y estoy por terminar otra, gracias a su acompañamiento.",
                     },
                     {
                        name: "Rafael Cid",
                        text: "Agradezco su existencia ya que me permite un poco más organizar mis gastos y evitar las presiones de las llamadas.",
                     },
                     {
                        name: "Sergio Sánchez",
                        text: "Excelente atención personalizada,Los recomiendo ampliamente me sacaron de un gran apuro.",
                     },
                     {
                        name: "Alejandra García",
                        text: "Lo pensé mucho para confiar pero a final de cuentas me decidí.",
                     },
                     {
                        name: "Oso Calleja",
                        text: "Excelente opción para liquidar deudas.",
                     },
                     {
                        name: "Pablo Av",
                        text: "Hasta ahora, buena experiencia, ya he liquidado 2 deudas, y espero estar cerca de liquidar más.",
                     },
                  ].map((item, index) => (
                     <View key={index} className="bg-movapp-linkBackgroundHome rounded-2xl px-4 py-4 mb-3">
                        <Text className="text-movapp-textSecondary text-sm font-semibold mb-1">{item.name}</Text>
                        <View className="flex-row mb-2">
                           {Array.from({ length: 5 }).map((_, i) => (
                              <Feather key={i} name="star" size={20} color="#fbbf24" style={{ marginRight: 2 }} />
                           ))}
                        </View>
                        <Text className="text-movapp-textSecondary text-sm" style={{ textAlign: "justify" }}>
                           {item.text}
                        </Text>
                     </View>
                  ))}
               </ScrollView>
            </View>
            {/* Rol de Movapp */}
            <View className="bg-movapp-linkBackground rounded-3xl p-5 mb-5">
               <Text className="text-white text-lg font-bold mb-3">Primero tu tranquilidad</Text>
               <Text className="text-gray-200 text-sm mb-2" style={{ textAlign: "justify" }}>
                  Después reconstruyes tu estabilidad financiera. Cuando identificamos que una persona necesita
                  reorganizar deudas legales, podemos recomendarle directamente a{" "}
                  <Text className="text-movapp-primary font-semibold ">Curadeuda</Text>, empresa especializada en este
                  tipo de procesos.
               </Text>
            </View>
            {/* Disclaimer */}
            <View className="px-4 pb-6">
               <View className="bg-yellow-900/30 border border-yellow-600/50 rounded-2xl p-5">
                  <View className="flex-row items-center mb-3">
                     <Feather name="alert-triangle" size={24} color="#fbbf24" />
                     <Text className="text-yellow-400 text-base font-bold ml-3">Descargo de responsabilidad</Text>
                  </View>
                  <Text className="text-gray-300 text-sm mb-3 font-bold">Aviso Importante</Text>
                  <Text className="text-gray-300 text-sm mb-4 text" style={{ textAlign: "justify" }}>
                     Movapp no ofrece servicios de reparación de deuda ni negocia con acreedores. Los procesos de
                     reparación son prestados directamente por la empresa especializada bajo sus propios términos y
                     condiciones.
                  </Text>
               </View>
            </View>
            {/* CTA */}
            <View className=" p-6">
               <DebtRepairButton />
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
