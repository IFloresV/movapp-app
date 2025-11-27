// app/(tabs)/hack.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CarScreen() {
   const [hackCount, setHackCount] = useState(1);
   const pricePerHack = 500; // número

   const increment = () => setHackCount((c) => c + 1);
   const decrement = () => {
      setHackCount((c) => (c > 1 ? c - 1 : c));
   };

   const total = useMemo(() => hackCount * pricePerHack, [hackCount, pricePerHack]);

   const fmt = useMemo(
      () =>
         new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
         }),
      [],
   );

   const totalFormatted = fmt.format(total);

   return (
      <LayoutWithNavigation scrollable={false}>
         <SafeAreaView className="flex-1">
            <ScrollView
               className="px-4 py-3"
               showsVerticalScrollIndicator={false}
               contentContainerStyle={{ paddingBottom: 140 }} // deja espacio para footer fijo
            >
               {/* Card principal */}
               <View className="bg-movapp-linkBorder rounded-2xl p-4 border border-gray-800 border-opacity-50 mb-2 flex-row items-center">
                  {/* Imagen a la izquierda */}
                  <Image
                     source={require("@/assets/images/elhack.png")}
                     style={{ width: 90, height: 60, borderRadius: 12, marginRight: 16 }}
                     resizeMode="contain"
                  />

                  {/* Contenido a la derecha */}
                  <View className="flex-1">
                     {/* Descripción arriba */}
                     <Text className="text-white text-base  mb-1">
                        Nuestra solución al acoso de las apps de préstamo.
                     </Text>

                     {/* Precio */}
                     <Text className="text-gray-300 text-lg font-semibold mb-2">{totalFormatted}</Text>

                     {/* Opciones: cantidad y eliminar */}
                     <View className="flex-row items-center">
                        {/* Botón disminuir */}
                        <TouchableOpacity
                           onPress={decrement}
                           className="bg-movapp-primary w-9 h-9 rounded-lg items-center justify-center"
                           activeOpacity={0.7}
                           disabled={hackCount <= 1}
                           style={{ opacity: hackCount <= 1 ? 0.45 : 1 }}
                           accessibilityLabel="Disminuir cantidad"
                           accessibilityState={{ disabled: hackCount <= 1 }}
                        >
                           <Text className="text-white text-xl font-bold">-</Text>
                        </TouchableOpacity>

                        {/* Cantidad */}
                        <Text className="text-white text-lg font-bold mx-4">{hackCount}</Text>

                        {/* Botón aumentar */}
                        <TouchableOpacity
                           onPress={increment}
                           className="bg-movapp-primary w-9 h-9 rounded-lg items-center justify-center"
                           activeOpacity={0.7}
                           accessibilityLabel="Aumentar cantidad"
                        >
                           <Text className="text-white text-xl font-bold">+</Text>
                        </TouchableOpacity>

                        {/* Botón eliminar */}
                        <TouchableOpacity
                           onPress={() => {
                              // Aquí puedes agregar la lógica para eliminar el producto
                              console.log("Eliminar producto");
                           }}
                           className="ml-4"
                           accessibilityLabel="Eliminar producto"
                        >
                           <Text className="text-red-500 text-lg font-bold">Eliminar</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>

               {/* Aquí podrías agregar más cards / items si hiciera falta */}
            </ScrollView>

            {/* FOOTER FIJO */}
            <View
               style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
               }}
               className="px-4 pb-6 pt-3 bg-transparent"
            >
               <View className="bg-movapp-linkBorder rounded-2xl p-4 border border-gray-800">
                  <View className="flex-row items-center justify-between mb-3">
                     <Text className="text-gray-300 text-base">Total</Text>
                     <Text className="text-white text-xl font-bold">{totalFormatted}</Text>
                  </View>

                  <TouchableOpacity
                     className="bg-movapp-primary py-4 rounded-xl items-center"
                     activeOpacity={0.85}
                     onPress={() => {
                        console.log(`Proceder al pago: ${hackCount} artículo(es) — ${totalFormatted}`);
                        router.push("/(auth)/login");
                        // aquí dispara flujo de pago / navegación
                     }}
                     accessibilityLabel="Proceder con el pago"
                  >
                     <Text className="text-white text-lg font-bold">Proceder con el pago</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </SafeAreaView>
      </LayoutWithNavigation>
   );
}
