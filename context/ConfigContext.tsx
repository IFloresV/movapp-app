// src/context/ConfigContext.tsx
import Service from "@/api/ConfigService";
import { useAxios } from "@/hooks/useAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
   createContext,
   ReactNode,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useReducer,
   useRef,
   useState,
} from "react";
import { ConfigContextType, ConfigState, Pais, Precio } from "../interfaces/config.interfaces";

const CACHE_KEY = "CONFIG_CACHE_V1";

const initialState: ConfigState = {
   loaded: false,
   paises: [],
   precios: [],
};

type ConfigAction = { type: "SET_DATA"; payload: { paises?: Pais[]; precios?: Precio[] } } | { type: "CLEAR_CONFIG" };

const configReducer = (state: ConfigState, action: ConfigAction): ConfigState => {
   switch (action.type) {
      case "SET_DATA":
         return {
            ...state,
            loaded: true,
            paises: action.payload.paises ?? state.paises,
            precios: action.payload.precios ?? state.precios,
         };
      case "CLEAR_CONFIG":
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
   const hasFetched = useRef(false); // ← CRUCIAL: Evita fetch múltiple

   // ==================== LOAD CACHE ====================
   useEffect(() => {
      const loadCache = async () => {
         try {
            const raw = await AsyncStorage.getItem(CACHE_KEY);
            if (raw) {
               const parsed = JSON.parse(raw);
               if (parsed?.paises || parsed?.precios) {
                  dispatchConfig({
                     type: "SET_DATA",
                     payload: {
                        paises: parsed.paises,
                        precios: parsed.precios,
                     },
                  });
                  console.log("✅ Config cache loaded");
               }
            }
         } catch (err) {
            console.warn("⚠️ Config cache load error:", err);
         } finally {
            setIsHydrated(true);
         }
      };

      loadCache();
   }, []); // ← Solo al montar

   // ==================== FETCH DATA (UNA SOLA VEZ) ====================
   useEffect(() => {
      if (isHydrated && !hasFetched.current) {
         hasFetched.current = true; // ← Marcar como ejecutado
         console.log("🌐 Fetching países...");
         fetchPaises().catch((err) => console.error("❌ Error fetching countries:", err));
      }
   }, [isHydrated]); // ← NO incluir fetchPaises aquí

   // ==================== UPDATE STATE FROM API ====================
   useEffect(() => {
      if (!dataPaises) return;

      const payloadCountries = dataPaises?.countries ?? dataPaises;
      const payloadPrecios = (dataPaises as any)?.precios;

      if (payloadCountries || payloadPrecios) {
         console.log("📥 Actualizando países desde API");
         dispatchConfig({
            type: "SET_DATA",
            payload: {
               paises: payloadCountries || undefined,
               precios: payloadPrecios || undefined,
            },
         });
      }
   }, [dataPaises]); // ← Solo cuando cambia dataPaises

   // ==================== SAVE CACHE ====================
   useEffect(() => {
      if (!isHydrated || !config.loaded) return;

      const saveCache = async () => {
         try {
            const payload = {
               paises: config.paises,
               precios: config.precios,
               version: 1,
               updatedAt: Date.now(),
            };
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(payload));
            console.log("💾 Config cache saved");
         } catch (err) {
            console.error("❌ Error saving config cache:", err);
         }
      };

      // Debounce para evitar guardados múltiples
      const timer = setTimeout(saveCache, 500);
      return () => clearTimeout(timer);
   }, [config.paises, config.precios, config.loaded, isHydrated]);

   // ==================== ACTIONS ====================

   const reloadPaises = useCallback(async () => {
      console.log("🔄 Recargando países...");
      try {
         await fetchPaises();
      } catch (err) {
         console.error("❌ reloadPaises error:", err);
      }
   }, [fetchPaises]);

   const setPrecios = useCallback((items: Precio[]) => {
      dispatchConfig({ type: "SET_DATA", payload: { precios: items } });
   }, []);

   const clearConfig = useCallback(async () => {
      try {
         await AsyncStorage.removeItem(CACHE_KEY);
         console.log("🗑️ Config cache cleared");
      } catch (err) {
         console.warn("⚠️ Error removing config cache:", err);
      }
      dispatchConfig({ type: "CLEAR_CONFIG" });
   }, []);

   // ==================== CONTEXT VALUE ====================

   const contextValue = useMemo(
      () => ({
         config,
         dispatchConfig,
         reloadPaises,
         setPrecios,
         clearConfig,
         isHydrated,
      }),
      [config, reloadPaises, setPrecios, clearConfig, isHydrated],
   );

   return <ConfigContext.Provider value={contextValue}>{children}</ConfigContext.Provider>;
};

export const useConfig = () => {
   const ctx = useContext(ConfigContext);
   if (!ctx) throw new Error("useConfig debe usarse dentro de ConfigProvider");
   return ctx;
};

export default ConfigContext;
