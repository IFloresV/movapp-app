import { useState } from "react";

type ApiError = {
   path?: string;
   msg?: string;
   [key: string]: any;
};

type ApiResponse = {
   success?: boolean;
   message?: string;
   data?: any;
   errors?: ApiError[];
};

type EndpointFn = (...args: any[]) => Promise<{ data: ApiResponse }>;

export const useAxios = (endpoint: EndpointFn, timeout = 0) => {
   const [data, setData] = useState<any>(null);
   const [error, setError] = useState<string>(""); // mensaje general
   const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({}); // errores por campo
   const [loading, setLoading] = useState<boolean>(false);

   const resetData = () => {
      setData(null);
      setError("");
      setFieldErrors({});
      setLoading(false);
   };
   const fetchData = async (...args: any[]) => {
      setLoading(true);
      setError("");
      try {
         const response = await endpoint(...args);
         // console.log("\x1b[34m", "Respuesta recibida en useAxios:", response.data);

         setData(response.data);

         if (!response.data?.success) {
            if (response.data?.errors && Array.isArray(response.data.errors)) {
               const messages = response.data.errors.map((e) => e.msg || "Error desconocido");
               setError(messages.join("\n"));
            } else {
               setError(response.data?.message || "Error desconocido");
            }
         } else {
            setError("");
         }

         return response.data;
      } catch (err: any) {
         // console.log("\x1b[36m", "Error en useAxios:", err);
         alert("Error al conectar con el servidor. Por favor, intenta nuevamente.");

         if (err?.response?.data?.errors) {
            const messages = err.response.data.errors.map((e: any) => e.msg || "Error desconocido");
            setError(messages.join("\n"));
         } else if (err?.response?.data?.message) {
            setError(err.response.data.message);
         } else {
            setError("Error al conectar con el servidor");
         }
         return { success: false, errors: err?.response?.data?.errors || [] };
      } finally {
         setLoading(false);
      }
   };

   return [fetchData, data, error, fieldErrors, loading, setError, resetData] as const;
};
