// src/interfaces/config.interfaces.ts

export interface Pais {
   id: number;
   codigo_pais: string;
   pais: string;
   moneda: string;
   simbolo: string;
   codigo_telefono: string;
}

export interface Precio {
   producto_id: number;
   sku: string;
   nombre: string;
   descripcion: string;
   precio: string;
   precio_mx: string;
   moneda: string;
   simbolo: string;
}

export interface ConfigState {
   loaded: boolean;
   paises: Pais[];
   precios?: Precio[];
}

export interface ConfigContextType {
   config: ConfigState;
   dispatchConfig: React.Dispatch<any>;
   reloadPaises: () => Promise<void>;
   setPrecios: (preciosData: Precio[]) => void;
}
