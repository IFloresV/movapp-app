import { CartContextType, CartItem, ProductBase } from "@/interfaces/cart.interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useCallback, useEffect, useState } from "react";

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
   const [cart, setCart] = useState<CartItem[]>([]);

   useEffect(() => {
      const loadCart = async () => {
         try {
            const storedCart = await AsyncStorage.getItem("cart");
            if (storedCart) {
               setCart(JSON.parse(storedCart));
            }
         } catch (error) {
            console.log("Error loading cart:", error);
         }
      };
      loadCart();
   }, []);

   useEffect(() => {
      AsyncStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   const addToCart = (product: ProductBase) => {
      setCart((prev) => {
         const existing = prev.find((p) => p.producto_id === product.producto_id);

         if (existing) {
            return prev.map((p) =>
               p.producto_id === product.producto_id
                  ? {
                       ...p,
                       quantity: p.quantity + 1,
                       total: (p.quantity + 1) * parseFloat(p.precio),
                    }
                  : p,
            );
         }

         return [
            ...prev,
            {
               ...product,
               quantity: 1,
               total: parseFloat(product.precio),
            },
         ];
      });
   };

   const decreaseQuantity = (producto_id: number) => {
      setCart((prev) =>
         prev
            .map((p) =>
               p.producto_id === producto_id
                  ? {
                       ...p,
                       quantity: Math.max(0, (p.quantity ?? 1) - 1),
                       total: Math.max(0, Math.max(0, (p.quantity ?? 1) - 1) * parseFloat(p.precio)),
                    }
                  : p,
            )
            .filter((p) => (p.quantity ?? 0) > 0),
      );
   };

   const removeFromCart = (producto_id: number) => {
      setCart((prev) => prev.filter((p) => p.producto_id !== producto_id));
   };

   const clearCart = useCallback(async () => {
      try {
         // Limpiar estado
         setCart([]);
         // Limpiar AsyncStorage
         await AsyncStorage.removeItem("cart");
      } catch (error) {
         console.log("\x1b[31m[CartContext] ❌ Error limpiando carrito:", error);
      }
   }, []);

   // Actualiza los precios del carrito según el listado de precios de un país
   const updateCartPrices = useCallback((precios: any[]) => {
      if (!precios || precios.length === 0) return;

      setCart((prev) => {
         if (prev.length === 0) return prev;

         console.log("\x1b[33m[CartContext] 🔄 Actualizando precios del carrito...", prev.length, "items");

         const updated = prev.map((item) => {
            const match = precios.find((p) => p.producto_id === item.producto_id);
            if (!match) {
               console.log("\x1b[33m[CartContext] ⚠️ Sin precio para producto_id:", item.producto_id, "- se mantiene precio anterior");
               return item;
            }
            const newPrecio = match.precio ?? item.precio;
            return {
               ...item,
               precio: String(newPrecio),
               precio_mx: match.precio_mx ?? item.precio_mx,
               moneda: match.moneda || item.moneda,
               simbolo: match.simbolo || item.simbolo,
               total: item.quantity * parseFloat(String(newPrecio)),
            };
         });

         console.log("\x1b[32m[CartContext] ✅ Precios del carrito actualizados");
         return updated;
      });
   }, []);

   return (
      <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, updateCartPrices }}>
         {children}
      </CartContext.Provider>
   );
};
