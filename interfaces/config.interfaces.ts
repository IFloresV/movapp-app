// src/interfaces/config.interfaces.ts

export interface Pais {
   id: number;
   codigo_pais: string;
   pais: string;
   moneda: string;
   simbolo: string;
   codigo_telefono: string;
}

export interface ConfigState {
   loaded: boolean; // ✅ Indica si los datos ya fueron cargados
   paises: Pais[];
}

export interface ConfigContextType {
   config: ConfigState;
   dispatchConfig: React.Dispatch<any>;
   reloadPaises: () => Promise<void>;
}
