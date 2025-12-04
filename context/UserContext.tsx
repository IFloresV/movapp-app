// src/context/UserContext.tsx
import * as SecureStore from "expo-secure-store";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { UserContextType, UserState } from "../interfaces/user.interfaces";

const initialState: UserState = {
   logged: false,
   infoUser: {},
};

type UserAction = { type: "LOGIN"; payload: any } | { type: "LOGOUT" };

const userReducer = (state: UserState, action: UserAction): UserState => {
   switch (action.type) {
      case "LOGIN":
         return { logged: true, infoUser: action.payload };
      case "LOGOUT":
         return initialState;
      default:
         return state;
   }
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
   const [state, dispatch] = useReducer(userReducer, initialState);
   const [isHydrated, setIsHydrated] = useState(false);

   // ==================== HELPERS ====================

   const saveCredentials = useCallback(async (userObj: any, accessToken?: string, refreshToken?: string) => {
      try {
         const saves = [];
         if (userObj) saves.push(SecureStore.setItemAsync("USER_DATA", JSON.stringify(userObj)));
         if (accessToken) saves.push(SecureStore.setItemAsync("ACCESS_TOKEN", accessToken));
         if (refreshToken) saves.push(SecureStore.setItemAsync("REFRESH_TOKEN", refreshToken));

         await Promise.all(saves);
         console.log("✅ Credenciales guardadas");
      } catch (e) {
         console.warn("⚠️ Error guardando credenciales:", e);
      }
   }, []);

   const clearStorage = useCallback(async () => {
      try {
         await Promise.all([
            SecureStore.deleteItemAsync("USER_DATA"),
            SecureStore.deleteItemAsync("ACCESS_TOKEN"),
            SecureStore.deleteItemAsync("REFRESH_TOKEN"),
         ]);
         console.log("🗑️ Credenciales eliminadas");
      } catch (e) {
         console.warn("⚠️ Error limpiando credenciales:", e);
      }
   }, []);

   // ==================== ACTIONS ====================

   const handleLogin = useCallback(
      async (userObj: any, accessToken?: string, refreshToken?: string) => {
         console.log("🔐 Login iniciado");
         dispatch({ type: "LOGIN", payload: userObj });
         await saveCredentials(userObj, accessToken, refreshToken);
      },
      [saveCredentials],
   );

   const handleLogout = useCallback(async () => {
      console.log("👋 Logout iniciado");
      dispatch({ type: "LOGOUT" });
      await clearStorage();
   }, [clearStorage]);

   const updateUser = useCallback(async (userObj: any) => {
      console.log("👤 Actualizando usuario");
      dispatch({ type: "LOGIN", payload: userObj });
      await SecureStore.setItemAsync("USER_DATA", JSON.stringify(userObj));
   }, []);

   // ==================== HYDRATION ====================

   useEffect(() => {
      const hydrate = async () => {
         try {
            console.log("💧 Hidratando UserContext...");

            const [storedUser, storedAccess] = await Promise.all([
               SecureStore.getItemAsync("USER_DATA"),
               SecureStore.getItemAsync("ACCESS_TOKEN"),
            ]);

            // Parsear usuario
            let userObj = null;
            if (storedUser) {
               try {
                  userObj = JSON.parse(storedUser);
               } catch {
                  console.warn("⚠️ Usuario en storage corrupto");
               }
            }

            // Si hay access token y usuario, restaurar sesión
            if (storedAccess && userObj) {
               console.log("✅ Sesión restaurada");
               dispatch({ type: "LOGIN", payload: userObj });
            } else {
               console.log("ℹ️ No hay sesión previa");
            }
         } catch (e) {
            console.warn("⚠️ Error en hydrate:", e);
         } finally {
            setIsHydrated(true);
            console.log("✅ UserContext hidratado");
         }
      };

      hydrate();
   }, []);

   // ==================== CONTEXT VALUE ====================

   const contextValue = useMemo(
      () => ({
         user: state,
         dispatchUser: dispatch,
         login: handleLogin,
         logout: handleLogout,
         updateUser,
         isHydrated,
      }),
      [state, handleLogin, handleLogout, updateUser, isHydrated],
   );

   return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => {
   const ctx = useContext(UserContext);
   if (!ctx) throw new Error("useUser debe usarse dentro de UserProvider");
   return ctx;
};

export default UserContext;
