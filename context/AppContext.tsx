// src/context/AppContext.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";

import ConfigService from "@/api/ConfigService";
import { STORAGE_KEYS } from "@/constants/storageKeys";

// ==================== TYPES ====================

type UserState = {
   logged: boolean;
   infoUser: any;
};

type ConfigState = {
   loaded: boolean;
   paises: any[];
   precios: any[];
};

type AppState = {
   user: UserState;
   config: ConfigState;
};

const initialState: AppState = {
   user: {
      logged: false,
      infoUser: {},
   },
   config: {
      loaded: false,
      paises: [],
      precios: [],
   },
};

type AppAction =
   | { type: "USER_LOGIN"; payload: any }
   | { type: "USER_LOGOUT" }
   | { type: "USER_UPDATE"; payload: any }
   | { type: "CONFIG_SET"; payload: { paises?: any[]; precios?: any[] } }
   | { type: "CONFIG_LOADED"; payload: { paises: any[]; precios: any[] } }
   | { type: "CONFIG_CLEAR" }
   | { type: "HYDRATE_DONE"; payload: Partial<AppState> };

// ==================== REDUCER ====================

function appReducer(state: AppState, action: AppAction): AppState {
   console.log("\x1b[36m[AppContext Reducer]", action.type);

   switch (action.type) {
      case "USER_LOGIN":
         return {
            ...state,
            user: {
               logged: true,
               infoUser: action.payload,
            },
         };

      case "USER_LOGOUT":
         return {
            ...state,
            user: {
               logged: false,
               infoUser: {},
            },
         };

      case "USER_UPDATE":
         return {
            ...state,
            user: {
               ...state.user,
               infoUser: action.payload,
            },
         };

      case "CONFIG_LOADED":
         return {
            ...state,
            config: {
               loaded: true,
               paises: action.payload.paises,
               precios: action.payload.precios,
            },
         };

      case "CONFIG_SET":
         return {
            ...state,
            config: {
               ...state.config,
               paises: action.payload.paises ?? state.config.paises,
               precios: action.payload.precios ?? state.config.precios,
            },
         };

      case "CONFIG_CLEAR":
         return {
            ...state,
            config: {
               loaded: false,
               paises: [],
               precios: [],
            },
         };

      case "HYDRATE_DONE":
         return {
            ...state,
            ...action.payload,
         };

      default:
         return state;
   }
}

// ==================== CONTEXT ====================

type AppContextType = {
   // User state & methods
   user: UserState;
   dispatchUser: React.Dispatch<AppAction>;
   login: (userObj: any, accessToken?: string, refreshToken?: string) => Promise<any[]>;
   logout: () => Promise<any[]>;
   updateUser: (userObj: any) => Promise<void>;

   // Config state & methods
   config: ConfigState;
   setConfig: (paises?: any[], precios?: any[]) => void;
   clearConfig: () => void;
   refreshPrices: (paisId: number) => Promise<void>;
   reloadPaises: () => Promise<void>; // ✅ Agregado

   // Hydration
   isHydrated: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// ==================== PROVIDER ====================

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, dispatch] = useReducer(appReducer, initialState);
   const [isHydrated, setIsHydrated] = useState(false);

   // ==================== STORAGE HELPERS ====================

   const saveCredentials = useCallback(async (userObj: any, accessToken?: string, refreshToken?: string) => {
      try {
         // console.log("\x1b[33m[AppContext] 💾 Guardando credenciales...");

         const saves = [];
         if (userObj) saves.push(SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(userObj)));
         if (accessToken) saves.push(SecureStore.setItemAsync(STORAGE_KEYS.ACCESS, accessToken));
         if (refreshToken) saves.push(SecureStore.setItemAsync(STORAGE_KEYS.REFRESH, refreshToken));

         await Promise.all(saves);
         // console.log("\x1b[32m[AppContext] ✅ Credenciales guardadas");
      } catch (e) {
         // console.log("\x1b[31m[AppContext] ❌ Error guardando credenciales:", e);
      }
   }, []);

   const clearStorage = useCallback(async () => {
      try {
         // console.log("\x1b[33m[AppContext] 🗑️ Limpiando credenciales...");

         await Promise.all([
            SecureStore.deleteItemAsync(STORAGE_KEYS.USER),
            SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS),
            SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH),
         ]);

         // console.log("\x1b[32m[AppContext] ✅ Credenciales eliminadas");
      } catch (e) {
         // console.log("\x1b[31m[AppContext] ❌ Error limpiando credenciales:", e);
      }
   }, []);

   const saveConfigCache = useCallback(async (paises: any[], precios: any[]) => {
      try {
         await AsyncStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify({ paises, precios }));
         console.log("\x1b[32m[AppContext] ✅ Config guardada en cache");
      } catch (e) {
         console.log("\x1b[31m[AppContext] ❌ Error guardando cache:", e);
      }
   }, []);

   // ==================== CONFIG METHODS ====================

   const fetchCountries = useCallback(async (): Promise<any[]> => {
      try {
         console.log("\x1b[33m[AppContext] 🌍 Obteniendo países...");
         const response = await ConfigService.getCountries();

         if (response?.data?.success) {
            const countries = response.data.countries || [];
            console.log("\x1b[32m[AppContext] ✅ Países obtenidos:", countries.length, 
               // countries
            );
            return countries;
         }

         console.log("\x1b[33m[AppContext] ⚠️ No se pudieron obtener países");
         return [];
      } catch (error) {
         console.log("\x1b[31m[AppContext] ❌ Error obteniendo países:", error);
         return [];
      }
   }, []);

   const fetchPrices = useCallback(async (paisId: number): Promise<any[]> => {
      try {
         console.log("\x1b[33m[AppContext] 💰 Obteniendo precios para país:", paisId);
         const response = await ConfigService.getPrices(paisId);

         if (response?.data?.success) {
            const prices = response.data.prices || [];
            console.log("\x1b[32m[AppContext] ✅ Precios obtenidos:", prices.length, prices);
            return prices;
         }

         console.log("\x1b[33m[AppContext] ⚠️ No se pudieron obtener precios");
         return [];
      } catch (error) {
         console.log("\x1b[31m[AppContext] ❌ Error obteniendo precios:", error);
         return [];
      }
   }, []);

   // ✅ Método para recargar países manualmente
   const reloadPaises = useCallback(async () => {
      console.log("\x1b[33m[AppContext] 🔄 Recargando países...");
      try {
         const paises = await fetchCountries();

         dispatch({
            type: "CONFIG_SET",
            payload: { paises },
         });

         await saveConfigCache(paises, state.config.precios);

         console.log("\x1b[32m[AppContext] ✅ Países recargados:", paises.length);
      } catch (error) {
         console.log("\x1b[31m[AppContext] ❌ Error recargando países:", error);
      }
   }, [fetchCountries, saveConfigCache, state.config.precios]);

   const refreshPrices = useCallback(
      async (paisId: number) => {
         const precios = await fetchPrices(paisId);

         dispatch({
            type: "CONFIG_SET",
            payload: { precios },
         });

         await saveConfigCache(state.config.paises, precios);
      },
      [fetchPrices, saveConfigCache, state.config.paises],
   );

   // ==================== USER METHODS ====================

   const login = useCallback(
      async (userObj: any, accessToken?: string, refreshToken?: string): Promise<any[]> => {
         console.log("\x1b[33m[AppContext] 🔐 Login iniciado");
         console.log("  - User:", userObj);
         console.log("  - País ID:", userObj?.pais_id);

         let preciosCargados: any[] = [];

         try {
            // Guardar credenciales
            await saveCredentials(userObj, accessToken, refreshToken);

            // Actualizar estado de usuario
            dispatch({ type: "USER_LOGIN", payload: userObj });

            // Obtener precios del país del usuario (o cargar precios por defecto MX id 1 si no tiene país)
            if (userObj?.pais_id) {
               const precios = await fetchPrices(userObj.pais_id);
               preciosCargados = precios;

               dispatch({
                  type: "CONFIG_SET",
                  payload: { precios },
               });

               await saveConfigCache(state.config.paises, precios);
            } else {
               try {
                  const precios = await fetchPrices(1);
                  preciosCargados = precios;
                  dispatch({
                     type: "CONFIG_SET",
                     payload: { precios },
                  });
                  await saveConfigCache(state.config.paises, precios);
               } catch (e) {
                  // Silenciar error al obtener precios por defecto
               }
            }

            console.log("\x1b[32m[AppContext] ✅ Login completado - Precios cargados:", preciosCargados.length);
         } catch (error) {
            console.log("\x1b[31m[AppContext] ❌ Error en login:", error);
            throw error;
         }

         return preciosCargados;
      },
      [saveCredentials, fetchPrices, saveConfigCache, state.config.paises],
   );

   const logout = useCallback(async (): Promise<any[]> => {
      console.log("\x1b[33m[AppContext] 🚪 Logout iniciado");

      let preciosDefault: any[] = [];

      try {
         await clearStorage();
         dispatch({ type: "USER_LOGOUT" });

         // Recargar precios del país default (MX id=1) para el carrito
         try {
            preciosDefault = await fetchPrices(1);
            dispatch({ type: "CONFIG_SET", payload: { precios: preciosDefault } });
            await saveConfigCache(state.config.paises, preciosDefault);
            console.log("\x1b[32m[AppContext] ✅ Logout: precios default restaurados:", preciosDefault.length);
         } catch (e) {
            console.log("\x1b[31m[AppContext] ⚠️ Logout: no se pudieron cargar precios default", e);
         }

         console.log("\x1b[32m[AppContext] ✅ Logout completado");
      } catch (error) {
         console.log("\x1b[31m[AppContext] ❌ Error en logout:", error);
      }

      return preciosDefault;
   }, [clearStorage, fetchPrices, saveConfigCache, state.config.paises]);

   const updateUser = useCallback(
      async (userObj: any) => {
         // console.log("\x1b[33m[AppContext] 👤 Actualizando usuario");

         try {
            await SecureStore.setItemAsync(STORAGE_KEYS.USER, JSON.stringify(userObj));

            dispatch({
               type: "USER_UPDATE",
               payload: userObj,
            });

            // Si cambió el país, actualizar precios
            if (userObj?.pais_id && userObj.pais_id !== state.user.infoUser?.pais_id) {
               // console.log("\x1b[33m[AppContext] 🔄 País cambió, actualizando precios...");
               await refreshPrices(userObj.pais_id);
            }

            // console.log("\x1b[32m[AppContext] ✅ Usuario actualizado");
         } catch (error) {
            // console.log("\x1b[31m[AppContext] ❌ Error actualizando usuario:", error);
         }
      },
      [refreshPrices, state.user.infoUser],
   );

   // ==================== CONFIG METHODS ====================

   const setConfig = useCallback(
      (paises?: any[], precios?: any[]) => {
         // console.log("\x1b[33m[AppContext] ⚙️ Actualizando config");

         dispatch({
            type: "CONFIG_SET",
            payload: { paises, precios },
         });

         if (paises || precios) {
            saveConfigCache(paises ?? state.config.paises, precios ?? state.config.precios);
         }
      },
      [saveConfigCache, state.config.paises, state.config.precios],
   );

   const clearConfig = useCallback(() => {
      // console.log("\x1b[33m[AppContext] 🗑️ Limpiando config");

      dispatch({ type: "CONFIG_CLEAR" });
      AsyncStorage.removeItem(STORAGE_KEYS.CONFIG).catch(console.log);
   }, []);

   // ==================== HYDRATION ====================

   useEffect(() => {
      const hydrate = async () => {
         console.log("\x1b[33m[AppContext] 🔄 Iniciando hydrate...");

         // ⚠️ SOLO PARA PRUEBAS — quitar antes de producción
         await AsyncStorage.removeItem(STORAGE_KEYS.CONFIG);
         console.log("\x1b[35m[AppContext] 🧹 Cache de config borrado para pruebas");

         try {
            // Cargar datos guardados
            const [storedUser, storedAccess, cachedConfig] = await Promise.all([
               SecureStore.getItemAsync(STORAGE_KEYS.USER),
               SecureStore.getItemAsync(STORAGE_KEYS.ACCESS),
               AsyncStorage.getItem(STORAGE_KEYS.CONFIG),
            ]);

            console.log("\x1b[35m[AppContext] 📦 Datos en storage:");
            console.log("  - User:", storedUser ? "EXISTS" : "NULL");
            console.log("  - Access:", storedAccess ? "EXISTS" : "NULL");
            console.log("  - Cache:", cachedConfig ? "EXISTS" : "NULL");

            let userObj = null;
            let paises: any[] = [];
            let precios: any[] = [];

            // Parsear usuario
            if (storedUser) {
               try {
                  userObj = JSON.parse(storedUser);
                  console.log("\x1b[32m[AppContext] ✅ Usuario restaurado:", userObj.nombre);
               } catch (e) {
                  console.log("\x1b[31m[AppContext] ❌ Error parseando usuario:", e);
               }
            }

            // Parsear cache de config
            if (cachedConfig) {
               try {
                  const parsed = JSON.parse(cachedConfig);
                  paises = parsed.paises ?? [];
                  precios = parsed.precios ?? [];
                  console.log("\x1b[32m[AppContext] ✅ Config desde cache - Países:", paises.length, "Precios:", precios.length);
               } catch (e) {
                  console.log("\x1b[31m[AppContext] ❌ Error parseando cache:", e);
               }
            }

            // ✅ SIEMPRE obtener países si no hay en cache
            if (paises.length === 0) {
               console.log("\x1b[33m[AppContext] 🌍 No hay países en cache, obteniendo...");
               paises = await fetchCountries();
            }

            // Obtener precios del país del usuario si está logueado
            if (userObj?.pais_id && precios.length === 0) {
               console.log("\x1b[33m[AppContext] 💰 Usuario logueado - obteniendo precios para país:", userObj.pais_id);
               precios = await fetchPrices(userObj.pais_id);
            }

            // Si no hay precios aún (usuario sin sesión), usar locale del dispositivo
            if (precios.length === 0) {
               try {
                  const locale = Localization.getLocales()[0];
                  console.log("\x1b[36m[AppContext] 🌐 locale:", locale);

                  const regionCode = locale?.regionCode ?? "MX";
                  console.log("\x1b[31m[AppContext] 🌐 Locale del dispositivo:", regionCode);

                  // Buscar el país en el listado por código
                  const paisPorLocale = paises.find(
                     (p) => p.codigo_pais?.toUpperCase() === regionCode.toUpperCase()
                  );

                  if (paisPorLocale) {
                     console.log("\x1b[32m[AppContext] ✅ País por locale encontrado:", paisPorLocale.pais, "id:", paisPorLocale.id);
                     precios = await fetchPrices(paisPorLocale.id);
                  } else {
                     console.log("\x1b[33m[AppContext] ⚠️ País '", regionCode, "' no encontrado en lista, usando MX por defecto");
                     precios = await fetchPrices(1);
                  }
               } catch (e) {
                  console.log("\x1b[31m[AppContext] ❌ Error obteniendo locale, usando MX por defecto:", e);
                  precios = await fetchPrices(1);
               }
            }

            // Guardar en cache si se obtuvieron datos
            if (paises.length > 0 || precios.length > 0) {
               await saveConfigCache(paises, precios);
            }

            // Restaurar estado
            const userState: UserState =
               storedAccess && userObj ? { logged: true, infoUser: userObj } : { logged: false, infoUser: {} };

            const configState: ConfigState = {
               loaded: paises.length > 0,
               paises,
               precios,
            };

            dispatch({
               type: "HYDRATE_DONE",
               payload: {
                  user: userState,
                  config: configState,
               },
            });

            console.log("\x1b[32m[AppContext] ✅ Hydrate completado");
            console.log("\x1b[32m[AppContext] 📊 Países cargados:", paises.length, 
               // paises
            );
            
         } catch (error) {
            console.log("\x1b[31m[AppContext] ❌ Error en hydrate:", error);
         } finally {
            setIsHydrated(true);
         }
      };

      hydrate();
   }, [fetchCountries, fetchPrices, saveConfigCache]);

   // ==================== CONTEXT VALUE ====================

   const contextValue = useMemo<AppContextType>(
      () => ({
         // User
         user: state.user,
         dispatchUser: dispatch,
         login,
         logout,
         updateUser,

         // Config
         config: state.config,
         setConfig,
         clearConfig,
         refreshPrices,
         reloadPaises, // ✅ Agregado

         // Hydration
         isHydrated,
      }),
      [state, login, logout, updateUser, setConfig, clearConfig, refreshPrices, reloadPaises, isHydrated],
   );

   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// ==================== HOOK ====================

export const useApp = () => {
   const ctx = useContext(AppContext);
   if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
   return ctx;
};
