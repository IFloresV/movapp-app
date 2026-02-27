// src/interfaces/cart.interfaces.ts

export type CartItem = {
   producto_id: number;
   sku: string;
   nombre: string;
   precio: string;
   precio_mx: string;
   moneda: string;
   simbolo: string;
   quantity: number;
   total: number;
};

export type ProductBase = {
   producto_id: number;
   sku: string;
   nombre: string;
   precio: string;
   precio_mx: string;
   moneda: string;
   simbolo: string;
};

export type CartContextType = {
   cart: CartItem[];
   addToCart: (product: ProductBase) => void;
   decreaseQuantity: (producto_id: number) => void;
   removeFromCart: (producto_id: number) => void;
   clearCart: () => void;
   updateCartPrices: (precios: any[]) => void;
};
