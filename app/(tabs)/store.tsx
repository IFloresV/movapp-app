import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { CartContext } from "@/context/CartContext";
import { useConfig } from "@/context/ConfigContext";
import { useContext } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { getImage } from "@/utils/Images";

export default function StoreScreen() {
   const { config } = useConfig();
   const { addToCart } = useContext(CartContext)!;

   const preciosList: any[] = config?.precios || Object.values(config?.precios || {}).flat() || [];

   const renderItem = ({ item }: { item: any }) => {
      const priceLabel = item?.precio ?? "";

      return (
         <View className="w-full bg-movapp-background rounded-2xl p-4 mb-3 border border-movapp-borderCard border-opacity-50 flex-row">
            <View className="w-32 items-center justify-start mr-4 mx-2">
               <Image source={getImage(item.sku)} className="w-24 h-24 items-center justify-center mt-10" />
            </View>

            <View className="flex-1">
               <Text className="text-white text-xl font-extrabold mb-1">{item.nombre}</Text>
               <Text className="text-gray-300 text-sm mb-3 pr-4">{item.descripcion}</Text>
               <Text className="text-[#A78BFA] text-2xl font-bold mb-4">
                  {item.simbolo ?? "$"} {priceLabel}
               </Text>

               <TouchableOpacity
                  activeOpacity={0.3}
                  onPress={() => addToCart(item)}
                  className="bg-movapp-primary py-3 rounded-lg items-center"
               >
                  <Text className="text-white font-bold text-base">Agregar al Carrito</Text>
               </TouchableOpacity>
            </View>
         </View>
      );
   };

   return (
      <LayoutWithNavigation scrollable={false}>
         <View className="flex-1 bg-movapp-black mx-2 rounded-2xl p-2">
            <FlatList
               data={preciosList}
               keyExtractor={(item) => item.sku ?? item.producto_id.toString()}
               renderItem={renderItem}
               contentContainerStyle={{
                  paddingBottom: 24,
                  paddingTop: 8,
               }}
            />
         </View>
      </LayoutWithNavigation>
   );
}
