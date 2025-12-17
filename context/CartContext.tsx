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
            console.error("Error loading cart:", error);
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
         console.error("\x1b[31m[CartContext] ❌ Error limpiando carrito:", error);
      }
   }, []);

   return (
      <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart }}>
         {children}
      </CartContext.Provider>
   );
};
