import { useApp } from "@/context/AppContext";
import { CartContext } from "@/context/CartContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useCallback, useContext } from "react";

export const useLogOut = () => {
   const { logout } = useApp();
   const cartContext = useContext(CartContext);
   const router = useRouter();

   const handleLogout = useCallback(async () => {
      try {
         // Limpiar el carrito antes de cerrar sesión
         if (cartContext) {
            const productIds = cartContext.cart.map((item) => item.producto_id);
            productIds.forEach((id) => cartContext.removeFromCart(id));

            // Asegurar la limpieza en AsyncStorage antes de navegar
            await AsyncStorage.removeItem("cart");
         }
         console.log("\x1b[32m[useLogOut] ✅ Carrito limpiado");

         // logout() maneja: limpiar credenciales, resetear user, cargar precios por locale y guardar cache
         await logout();

         router.replace("/");
      } catch (error) {
         console.log("\x1b[31m[useLogOut] ❌ Error en logout:", error);
      }
   }, [logout, cartContext, router]);

   return { logout: handleLogout };
};
