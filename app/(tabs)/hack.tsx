import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { useRouter } from "expo-router";
import { useContext, useEffect, useMemo, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { CartContext } from "@/context/CartContext"; // <-- nuevo import
import { useConfig } from "@/context/ConfigContext";
import UserContext from "@/context/UserContext";
import { getFlag } from "@/utils/Flags";

export default function HackScreen() {
   const { config } = useConfig();
   const { user } = useContext(UserContext)!;
   const { cart, addToCart, decreaseQuantity } = useContext(CartContext)!; // <-- usar contexto carrito
   const router = useRouter();
   const { paises } = config;

   const [showLoginModal, setShowLoginModal] = useState(false);

   const hasPrices = config?.precios && config.precios.length > 0;

   const hackPrice = useMemo(() => {
      if (!hasPrices) return null;
      return (config.precios ?? []).find((p) => (p.sku || "").toUpperCase() === "PROD-001") || null;
   }, [config.precios, hasPrices]);

   const cartItem = useMemo(() => {
      if (!cart || !hackPrice) return null;
      return cart.find((c: any) => (c.sku || "").toUpperCase() === "PROD-001") ?? null;
   }, [cart, hackPrice]);

   const [hackCount, setHackCount] = useState<number>(() => (cartItem ? cartItem.quantity ?? 1 : 1));

   useEffect(() => {
      setHackCount(cartItem ? cartItem.quantity ?? 1 : 1);
   }, [cartItem]);

   const priceValue = hackPrice?.precio ? Number(hackPrice.precio) : 500;
   const currencySymbol = hackPrice?.simbolo ?? "$";
   const currency = hackPrice?.moneda ?? "MXN";
   const totalPrice = (hackCount * priceValue).toFixed(2);

   const selectedCountry = paises?.find((p) => p.id === user?.infoUser?.pais_id);
   const countryCode = selectedCountry?.codigo_pais || "MX";

   const increment = () => {
      if (!hackPrice) return;
      addToCart(hackPrice);
   };

   const decrement = () => {
      if (!hackPrice) return;
      decreaseQuantity(hackPrice.producto_id);
   };

   const handleBuy = () => {
      // Si no hay precios disponibles mostrar modal de login/compra
      if (!hasPrices) {
         setShowLoginModal(true);
         return;
      }

      // Si no hay usuario logueado pedir login
      if (!user || !user.infoUser || !user.logged) {
         setShowLoginModal(true);
         return;
      }

      // Si hay un precio seleccionado, agregar al carrito solo si no existe aún
      if (hackPrice) {
         const exists = Array.isArray(cart)
            ? cart.some(
                 (c: any) =>
                    String(c.sku || "").toUpperCase() === String(hackPrice.sku || "").toUpperCase() ||
                    c.producto_id === hackPrice.producto_id,
              )
            : false;

         if (!exists) {
            // agregar con cantidad inicial 1 (ajusta según la forma en que addToCart espera el objeto)
            addToCart(hackPrice);
         }
      }

      // En cualquier caso navegar al carrito (si ya existía, se mantiene comportamiento actual)
      router.push("/car");
   };

   return (
      <LayoutWithNavigation scrollable={false}>
         <ScrollView className="px-4 py-3" showsVerticalScrollIndicator={false}>
            <View className="bg-movapp-linkBorder rounded-2xl p-6 border border-movapp-linkBorder border-opacity-50 mb-2">
               <Image
                  source={require("@/assets/images/elhack.png")}
                  style={{ width: 150, height: 80, alignSelf: "center" }}
                  resizeMode="contain"
               />

               {hasPrices && user?.logged && (
                  <View className="flex-row items-center justify-center mb-6">
                     <TouchableOpacity
                        onPress={decrement}
                        className="bg-movapp-primary w-14 h-14 rounded-xl items-center justify-center"
                        activeOpacity={0.7}
                        disabled={hackCount <= 1}
                        style={{ opacity: hackCount <= 1 ? 0.5 : 1 }}
                     >
                        <Text className="text-white text-2xl font-bold">-</Text>
                     </TouchableOpacity>

                     <View className="mx-6 min-w-[50px] items-center">
                        {/* mostrar la cantidad sincronizada con el carrito */}
                        <Text className="text-white text-4xl font-bold">{hackCount}</Text>
                     </View>

                     <TouchableOpacity
                        onPress={increment}
                        className="bg-movapp-primary w-14 h-14 rounded-xl items-center justify-center"
                        activeOpacity={0.7}
                     >
                        <Text className="text-white text-2xl font-bold">+</Text>
                     </TouchableOpacity>
                  </View>
               )}

               <View className="h-px bg-movapp-borderCard my-4" />

               {hasPrices && user?.logged && (
                  <View className="items-center mb-6">
                     <Text className="text-gray-400 text-sm mb-2">Tu pago es de:</Text>
                     <View className="flex-row items-center justify-center">
                        <Text className="text-white text-xl font-bold">
                           {currencySymbol} {totalPrice}
                        </Text>
                        <Text className="text-gray-300 text-2xl font-semibold ml-2">{currency} </Text>
                        <Text style={{ fontSize: 24, marginRight: 8 }}> {getFlag(countryCode)}</Text>
                     </View>
                  </View>
               )}

               <TouchableOpacity
                  className="bg-movapp-primary py-4 rounded-xl items-center"
                  activeOpacity={0.8}
                  onPress={handleBuy}
               >
                  <Text numberOfLines={1} ellipsizeMode="tail" className="text-white text-lg font-bold">
                     {!hasPrices || !user?.logged ? "Adquiere el Hack" : "Comprar"}
                  </Text>
               </TouchableOpacity>
            </View>

            <View className="bg-movapp-linkBorder rounded-xl p-6 border border-gray-700 border-opacity-50">
               <View className="flex-row items-center mb-1 space-x-3">
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

         {showLoginModal && (
            <View className="absolute inset-0 bg-black/60 items-center justify-center px-6">
               <View className="bg-movapp-linkBorder p-6 rounded-2xl w-full max-w-sm border border-gray-700">
                  <Text className="text-white text-xl font-bold mb-3 text-center">Inicia sesión</Text>
                  <Text className="text-gray-300 text-center mb-6">
                     Debes iniciar sesión antes de adquirir el Hack.
                  </Text>
                  <TouchableOpacity
                     onPress={() => {
                        setShowLoginModal(false);
                        router.push("/login");
                     }}
                     className="bg-movapp-primary py-3 rounded-xl items-center mb-3"
                  >
                     <Text className="text-white font-bold">Iniciar sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowLoginModal(false)} className="py-2 items-center">
                     <Text className="text-gray-300">Cancelar</Text>
                  </TouchableOpacity>
               </View>
            </View>
         )}
      </LayoutWithNavigation>
   );
}
