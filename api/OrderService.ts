// api/OrderService.ts
import api from "./axiosInstance";

export interface OrderItem {
   id: number;
   order_id: number;
   producto_id: number;
   sku: string;
   nombre: string;
   descripcion: string;
   precio_unitario: string;
   cantidad: number;
   subtotal: string;
   created_at: string;
   currency: string;
   simbolo: string;
}

export interface PaidOrdersResponse {
   success: boolean;
   count: number;
   orders: OrderItem[];
   message?: string;
}

const OrderService = {
   /**
    * Obtiene las órdenes pagadas del usuario autenticado
    * @param userUuid - UUID del usuario
    * @returns Promise con la lista de órdenes pagadas
    */
   getPaidOrders: async (userUuid: string): Promise<PaidOrdersResponse> => {
      try {
         const response = await api.get<PaidOrdersResponse>(`orders/paid/user/${userUuid}`);
         if (response.status === 200 && response.data && response.data.success) {
            return response.data;
         }

         return {
            success: false,
            count: 0,
            orders: [],
            message: "Error al obtener las órdenes",
         };
      } catch (error) {
         console.log("\x1b[31m[OrderService] Error al obtener órdenes :", error);
         return {
            success: false,
            count: 0,
            orders: [],
            message: error instanceof Error ? error.message : "Error desconocido",
         };
      }
   },
};

export default OrderService;
