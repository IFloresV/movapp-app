// hooks/useModuleVideos.ts
import VideosService from "@/api/VideosService";
import type { Module, Video } from "@/interfaces/videos.interfaces";
import { useCallback, useEffect, useState } from "react";

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

   const load = useCallback(async () => {
      setLoading(true);
      setError(null);
      const response = await VideosService.getByModule(slug);
      if (response.success && response.module) {
         setModule(response.module);
         setVideos(response.videos);
      } else {
         setError(response.message ?? "No se pudieron cargar los videos");
         setModule(null);
         setVideos([]);
      }
      setLoading(false);
   }, [slug]);

   useEffect(() => {
      load();
   }, [load]);

   return { module, videos, loading, error, reload: load };
}
