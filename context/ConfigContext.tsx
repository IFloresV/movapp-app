// src/context/ConfigContext.tsx
import { createContext, ReactNode, useContext, useEffect, useReducer } from "react";
import { ConfigContextType, ConfigState } from "../interfaces/config.interfaces";

import Service from "@/api/ConfigService";
import { useAxios } from "@/hooks/useAxios";

// ACTION TYPES
const SET_PAISES = "SET_PAISES";
const CLEAR_CONFIG = "CLEAR_CONFIG";

// INITIAL STATE
const initConfig = (): ConfigState => {
   return {
      loaded: false,
      paises: [],
   };
};

const initialState: ConfigState = {
   loaded: false,
   paises: [],
};

// REDUCER
const configReducer = (state: ConfigState = initialState, action: any): ConfigState => {
   switch (action.type) {
      case SET_PAISES:
         return {
            ...state,
            loaded: true,
            paises: action.payload || [],
         };

      case CLEAR_CONFIG:
         return {
            loaded: false,
            paises: [],
         };

      default:
         return state;
   }
};

// CONTEXT
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
   children: ReactNode;
}

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
   const [config, dispatchConfig] = useReducer(configReducer, initialState, initConfig);
   const [fetchPaises, data] = useAxios(Service.getCountries);

   useEffect(() => {
      if (!data) return;
      if (data.success && Array.isArray(data.paises)) {
         dispatchConfig({ type: SET_PAISES, payload: data.paises });
      } else if (Array.isArray(data)) {
         dispatchConfig({ type: SET_PAISES, payload: data });
      } else {
         console.error("Error en respuesta de países:", data.message || data.errors);
      }
   }, [data]);

   const reloadPaises = async () => {
      try {
         console.log("\x1b[35m", "reloadPaises");
         await fetchPaises();
      } catch (err) {
         console.error("Error al recargar países:", err);
      }
   };

   useEffect(() => {
      fetchPaises();
   }, []);

   return <ConfigContext.Provider value={{ config, dispatchConfig, reloadPaises }}>{children}</ConfigContext.Provider>;
};

// HOOK
export const useConfig = () => {
   const context = useContext(ConfigContext);
   if (context === undefined) {
      throw new Error("useConfig debe ser usado dentro de un ConfigProvider");
   }
   return context;
};

export default ConfigContext;
