// api/VideosService.ts
import api from "./axiosInstance";
import type { ModuleVideosResponse } from "@/interfaces/videos.interfaces";

const VideosService = {
   /**
    * Obtiene los videos de un módulo por su slug.
    * @param slug - identificador del módulo (ej. "home", "mind", "collaborations")
    */
   getByModule: async (slug: string): Promise<ModuleVideosResponse> => {
      try {
         const response = await api.get<ModuleVideosResponse>(`videos/${slug}`);
         if (response.status === 200 && response.data && response.data.success) {
            return response.data;
         }

         return {
            success: false,
            module: null,
            videos: [],
            message: response.data?.message ?? "Error al obtener los videos",
         };
      } catch (error) {
         console.log("\x1b[31m[VideosService] Error al obtener videos :", error);
         return {
            success: false,
            module: null,
            videos: [],
            message: error instanceof Error ? error.message : "Error desconocido",
         };
      }
   },
};

export default VideosService;
