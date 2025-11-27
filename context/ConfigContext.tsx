// src/context/ConfigContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import Service from "@/api/ConfigService";
import { useAxios } from "@/hooks/useAxios";
import { ConfigContextType, ConfigState } from "../interfaces/config.interfaces";

import { useRef } from "react";
import { Pais, Precio } from "../interfaces/config.interfaces";

// ACTION TYPES
const SET_PAISES = "SET_PAISES";
const SET_PRECIOS_PAIS = "SET_PRECIOS_PAIS";
const CLEAR_CONFIG = "CLEAR_CONFIG";

// CACHE KEY + VERSION
const CACHE_KEY = "CONFIG_CACHE_V1";

const initialState: ConfigState = {
   loaded: false,
   paises: [],
   precios: [],
};

const configReducer = (state: ConfigState, action: any): ConfigState => {
   switch (action.type) {
      case SET_PAISES:
         return { ...state, loaded: true, paises: action.payload || [] };
      case SET_PRECIOS_PAIS:
         return { ...state, precios: action.payload || [] };
      case CLEAR_CONFIG:
         return initialState;
      default:
         return state;
   }
};

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
   const [config, dispatchConfig] = useReducer(configReducer, initialState);

   const [fetchPaises, dataPaises] = useAxios(Service.getCountries);
   const [isHydrated, setIsHydrated] = useState(false);

   const lastSavedConfig = useRef<{ paises: Pais[]; precios?: Precio[] }>({ paises: [], precios: [] });

   useEffect(() => {
      (async () => {
         try {
            const raw = await AsyncStorage.getItem(CACHE_KEY);
            if (raw) {
               const parsed = JSON.parse(raw);
               if (parsed?.paises) {
                  dispatchConfig({ type: SET_PAISES, payload: parsed.paises });
               }
               if (parsed?.precios) {
                  dispatchConfig({ type: SET_PRECIOS_PAIS, payload: parsed.precios });
               }
               console.log("Config cache loaded");
               setIsHydrated(true);
               return;
            }

            await fetchPaises();
            setIsHydrated(true);
         } catch (err) {
            console.error("Error loading config cache:", err);
            await fetchPaises();
            setIsHydrated(true);
         }
      })();
   }, []);

   useEffect(() => {
      if (!dataPaises) return;
      if (dataPaises.success) {
         const countries = dataPaises.countries ?? dataPaises;
         dispatchConfig({ type: SET_PAISES, payload: countries });
      }
   }, [dataPaises]);

   useEffect(() => {
      if (!isHydrated) return;

      const persist = async () => {
         const hasChanged =
            JSON.stringify(lastSavedConfig.current.paises) !== JSON.stringify(config.paises) ||
            JSON.stringify(lastSavedConfig.current.precios) !== JSON.stringify(config.precios ?? []);

         if (!hasChanged) return;

         try {
            const payload = {
               paises: config.paises,
               precios: config.precios,
               version: 1,
               updatedAt: Date.now(),
            };
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));

            lastSavedConfig.current = {
               paises: config.paises,
               precios: config.precios ?? [],
            };
         } catch (err) {
            console.error("Error saving config cache:", err);
         }
      };

      persist();
   }, [config.paises, config.precios, isHydrated]);

   const reloadPaises = useCallback(async () => {
      await fetchPaises();
   }, [fetchPaises]);

   const setPrecios = useCallback((items: any[]) => {
      dispatchConfig({ type: SET_PRECIOS_PAIS, payload: items });
   }, []);

   const clearConfig = useCallback(async () => {
      dispatchConfig({ type: CLEAR_CONFIG });
   }, []);

   const contextValue = useMemo(
      () => ({
         config,
         dispatchConfig,
         reloadPaises,
         setPrecios,
         clearConfig,
      }),
      [config, reloadPaises, setPrecios, clearConfig],
   );

   return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
   const ctx = useContext(ConfigContext);
   if (!ctx) throw new Error("useConfig debe usarse dentro de ConfigProvider");
   return ctx;
};

export default ConfigContext;
