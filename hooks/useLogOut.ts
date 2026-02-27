import { useApp } from "@/context/AppContext";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "expo-router";
import { useCallback, useContext } from "react";

export const useLogOut = () => {
   const { logout, clearConfig } = useApp();
   const cartContext = useContext(CartContext);
   const router = useRouter();

   const handleLogout = useCallback(async () => {
      try {
         // Limpiar el carrito antes de cerrar sesión
         if (cartContext?.clearCart) {
            await cartContext.clearCart();
            console.log("\x1b[32m[useLogOut] ✅ Carrito limpiado");
         }

         clearConfig();
         const preciosDefault = await logout();

         // Restaurar precios del carrito al país default (MX)
         if (preciosDefault.length > 0 && cartContext?.updateCartPrices) {
            cartContext.updateCartPrices(preciosDefault);
            console.log("\x1b[32m[useLogOut] ✅ Precios del carrito restaurados al default:", preciosDefault.length);
         }

         router.replace("/");
      } catch (error) {
         console.log("\x1b[31m[useLogOut] ❌ Error en logout:", error);
      }
   }, [logout, clearConfig, cartContext, router]);

   return { logout: handleLogout };
};
