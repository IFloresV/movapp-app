// app/(tabs)/car.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import StripeCheckout from "@/components/StripeCheckout";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { CartContext } from "@/context/CartContext";
import { getImage } from "@/utils/Images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useMemo } from "react";
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function CarScreen() {
   const { cart, addToCart, clearCart, decreaseQuantity, removeFromCart } = useContext(CartContext)!;
   const { user } = useApp();
   const userData = user.infoUser;

   const user_id = userData?.id ?? 0;
   const email = userData?.email ?? "";
   const pais_id = userData?.pais_id ?? 0;
   const router = useRouter();

   const getQty = (item: any) => item.quantity ?? 1;

   const parsePrice = (item: any) => {
      const raw = item.precio ?? item.precio_mx ?? "0";
      return Number.parseFloat(String(raw).replace(",", "")) || 0;
   };

   // Total carrito
   const total = useMemo(() => {
      return cart.reduce((acc, it) => acc + parsePrice(it) * getQty(it), 0);
   }, [cart]);

   // Simbolo (si no existe alguno, usa $)
   const symbol = cart[0]?.simbolo ?? "$";
   const totalFormatted = `${symbol}${total.toFixed(2)}`;

   const computeAmountCents = () =>
      Math.round(
         (cart || []).reduce(
            (acc: number, it: any) => acc + parseFloat(it.precio ?? it.precio_mx ?? "0") * (it.quantity ?? 1),
            0,
         ) * 100,
      );

   const currency = (cart?.[0]?.moneda && String(cart[0].moneda).toUpperCase()) || "MXN";

   const renderItem = ({ item }: { item: any }) => {
      const qty = getQty(item);
      const pricePer = parsePrice(item);
      const symbol = item.simbolo ?? "$";
      const lineTotal = `${symbol}${(pricePer * qty).toFixed(2)}`;

      return (
         <View className="bg-movapp-linkBorder rounded-2xl p-4 border border-gray-800 border-opacity-50 mb-2 flex-row items-center">
            <Image
               source={getImage(item.sku)}
               style={{ width: 90, height: 60, borderRadius: 12, marginRight: 16 }}
               resizeMode="contain"
            />

            <View style={{ flex: 1 }}>
               <View className="flex-row justify-between items-start">
                  <Text className="text-white text-base mb-1 flex-1 pr-2">{item.nombre}</Text>

                  <Text className="text-white text-xl font-bold">{lineTotal}</Text>
               </View>

               <Text className="text-gray-300 text-sm mb-2">{item.descripcion ?? ""}</Text>

               <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center">
                     <TouchableOpacity
                        onPress={() => decreaseQuantity(item.producto_id)}
                        className="px-3 py-1 bg-movapp-primary rounded-lg mr-3"
                     >
                        <Text className="text-white text-lg font-bold">−</Text>
                     </TouchableOpacity>

                     <Text className="text-white text-base">{qty}</Text>

                     <TouchableOpacity
                        onPress={() => addToCart(item)}
                        className="px-3 py-1 bg-movapp-primary rounded-lg ml-3"
                     >
                        <Text className="text-white text-lg font-bold">+</Text>
                     </TouchableOpacity>
                  </View>

                  {/* Eliminar */}
                  <TouchableOpacity onPress={() => removeFromCart(item.producto_id)}>
                     <Ionicons name="trash-outline" size={24} color={Colors.movapp.red} />
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   };

   return (
      <LayoutWithNavigation scrollable={false}>
         <SafeAreaView className="flex-1">
            <View className="flex-1 px-4 pt-3 pb-40">
               <FlatList
                  data={cart}
                  renderItem={renderItem}
                  keyExtractor={(it) => it.sku ?? it.producto_id?.toString()}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                     <Text className="text-movapp-linkText text-center mt-20">Tu carrito está vacío.</Text>
                  }
                  ListFooterComponent={
                     <View className="mt-4 mb-4">
                        <TouchableOpacity
                           onPress={() => router.push("/store")}
                           className="bg-movapp-primary py-3 rounded-xl items-center"
                        >
                           <Text className="text-white font-bold text-base">← Volver a la tienda</Text>
                        </TouchableOpacity>
                     </View>
                  }
               />
            </View>

            {/* FOOTER */}
            <View
               style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
               className="px-4 pb-6 pt-3 bg-transparent"
            >
               <View className="bg-movapp-linkBorder rounded-2xl p-4 border border-movapp-borderCard border-opacity-50">
                  <View className="flex-row items-center justify-between mb-3">
                     <Text className="text-gray-300 text-base">Total</Text>
                     <Text className="text-white text-xl font-bold">{totalFormatted}</Text>
                  </View>

                  <StripeCheckout
                     cart={cart}
                     disabled={cart.length === 0}
                     amountCents={computeAmountCents()}
                     currency={currency}
                     userId={parseInt(user_id.toString(), 10)}
                     paisId={parseInt(pais_id.toString(), 10)}
                     email={email}
                     onSuccess={() => {
                        clearCart();
                        router.push("/payments/success");
                     }}
                  />
               </View>
            </View>
         </SafeAreaView>
      </LayoutWithNavigation>
   );
}
