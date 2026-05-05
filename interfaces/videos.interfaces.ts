// src/interfaces/videos.interfaces.ts

export interface Module {
   slug: string;
   nombre: string;
   descripcion: string | null;
}

export interface Video {
   id: number;
   videoId: string;
   orden: number;
}

export interface ModuleVideosResponse {
   success: boolean;
   module: Module | null;
   videos: Video[];
   message?: string;
}
