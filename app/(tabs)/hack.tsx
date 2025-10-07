// app/(tabs)/hack.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HackScreen() {
   const [hackCount, setHackCount] = useState(1);
   const pricePerHack = 500;

   const increment = () => setHackCount(hackCount + 1);
   const decrement = () => {
      if (hackCount > 1) setHackCount(hackCount - 1);
   };

   const totalPrice = (hackCount * pricePerHack).toFixed(2);

   return (
      <LayoutWithNavigation scrollable={false}>
         <ScrollView className="px-4 py-3" showsVerticalScrollIndicator={false}>
            {/* Card principal */}
            <View className="bg-movapp-linkBorder rounded-2xl p-6 border border-gray-700 border-opacity-50 mb-2">
               {/* Logo */}
               <Image
                  source={require("@/assets/images/elhack.png")}
                  style={{ width: 150, height: 80, alignSelf: "center" }}
                  resizeMode="contain"
               />

               {/* Título */}
               <Text className="text-white text-xl font-bold text-center mt-3 mb-2 px-2">
                  Nuestra solución al acoso de las apps de préstamo.
               </Text>

               {/* Contador */}
               <View className="flex-row items-center justify-center mb-6">
                  <TouchableOpacity
                     onPress={decrement}
                     className="bg-movapp-primary w-14 h-14 rounded-xl items-center justify-center"
                     activeOpacity={0.7}
                     disabled={hackCount <= 1}
                     style={{ opacity: hackCount <= 1 ? 0.5 : 1 }}>
                     <Text className="text-white text-2xl font-bold">-</Text>
                  </TouchableOpacity>

                  <View className="mx-6 min-w-[50px] items-center">
                     <Text className="text-white text-4xl font-bold">{hackCount}</Text>
                  </View>

                  <TouchableOpacity
                     onPress={increment}
                     className="bg-movapp-primary w-14 h-14 rounded-xl items-center justify-center"
                     activeOpacity={0.7}>
                     <Text className="text-white text-2xl font-bold">+</Text>
                  </TouchableOpacity>
               </View>

               {/* Texto de selección */}

               {/* Separador */}
               <View className="h-px bg-gray-700 my-4" />

               {/* Precio */}
               <View className="items-center mb-6">
                  <Text className="text-gray-400 text-sm mb-2">Tu pago es de:</Text>
                  <View className="flex-row items-center justify-center">
                     <Text className="text-white text-3xl font-bold">$ {totalPrice}</Text>
                     <Text className="text-gray-300 text-xl font-semibold ml-2">MXN</Text>
                     <Image
                        source={{ uri: "https://flagcdn.com/w80/mx.png" }}
                        style={{ width: 32, height: 22, marginLeft: 8, borderRadius: 3 }}
                        resizeMode="cover"
                     />
                  </View>
               </View>

               {/* Botón de compra */}
               <TouchableOpacity
                  className="bg-movapp-primary py-4 rounded-xl items-center"
                  activeOpacity={0.8}
                  onPress={() => {
                     console.log(`Comprando ${hackCount} hacks por $${totalPrice} MXN`);
                  }}>
                  <Text className="text-white text-lg font-bold">Comprar</Text>
               </TouchableOpacity>
            </View>

            {/* Información adicional (opcional) */}
            <View className="bg-movapp-linkBorder rounded-xl p-6 border border-gray-700 border-opacity-50">
               <View className="flex-row items-center  mb-1 space-x-3">
                  <Image
                     source={require("@/assets/images/elhack.png")}
                     style={{ width: 56, height: 56 }}
                     resizeMode="contain"
                  />
                  <Text className="text-white text-xl font-bold ml-3">es la solución que buscabas</Text>
               </View>
               <Text className="text-white text-md text-justify">
                  Si estás siendo víctima de amenazas digitales o te han hecho pagar deudas ficticias, EL HACK es la
                  solución confiable y efectiva que estabas buscando.
               </Text>
            </View>
         </ScrollView>
      </LayoutWithNavigation>
   );
}
