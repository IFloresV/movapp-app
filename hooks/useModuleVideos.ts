// hooks/useModuleVideos.ts
import VideosService from "@/api/VideosService";
import type { Module, Video } from "@/interfaces/videos.interfaces";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

interface UseModuleVideosResult {
   module: Module | null;
   videos: Video[];
   loading: boolean;
   error: string | null;
   reload: () => Promise<void>;
}

export function useModuleVideos(slug: string): UseModuleVideosResult {
   const [module, setModule] = useState<Module | null>(null);
   const [videos, setVideos] = useState<Video[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const hasLoadedOnce = useRef(false);

   const load = useCallback(async () => {
      // Spinner sólo en la primera carga; refrescos por foco actualizan en background.
      if (!hasLoadedOnce.current) {
         setLoading(true);
      }
      setError(null);
      const response = await VideosService.getByModule(slug);
      if (response.success && response.module) {
         setModule(response.module);
         setVideos(response.videos);
      } else {
         setError(response.message ?? "No se pudieron cargar los videos");
         // No limpiamos `module`/`videos`: si ya teníamos data, mantenerla evita parpadeo.
         if (!hasLoadedOnce.current) {
            setModule(null);
            setVideos([]);
         }
      }
      hasLoadedOnce.current = true;
      setLoading(false);
   }, [slug]);

   // Refresca cada vez que la pantalla recibe foco (no solo al montar).
   // Necesario en tabs de Expo Router porque las pantallas no se desmontan al cambiar de tab.
   useFocusEffect(
      useCallback(() => {
         load();
      }, [load]),
   );

   return { module, videos, loading, error, reload: load };
}
