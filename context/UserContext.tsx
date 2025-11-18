import * as SecureStore from "expo-secure-store";
import { createContext, ReactNode, useEffect, useReducer } from "react";

import { UserContextType, UserInfo, UserState } from "../interfaces/user.interfaces";

import { jwtDecode } from "jwt-decode";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState: UserState = {
   logged: false,
   infoUser: {},
};

// Reducer
const userReducer = (state: UserState, action: any): UserState => {
   switch (action.type) {
      case LOGIN:
         return { logged: true, infoUser: action.payload };

      case LOGOUT:
         return { logged: false, infoUser: {} };

      default:
         return state;
   }
};

// Context
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
   children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
   const [user, dispatchUser] = useReducer(userReducer, initialState);

   // --- LOGIN ---
   const login = async (userData: UserInfo) => {
      dispatchUser({ type: LOGIN, payload: userData });
      await SecureStore.setItemAsync("userData", JSON.stringify(userData));
   };

   // --- LOGOUT ---
   const logout = async () => {
      dispatchUser({ type: LOGOUT });
      await SecureStore.deleteItemAsync("userData");
      await SecureStore.deleteItemAsync("Token");
      await SecureStore.deleteItemAsync("RefreshToken");
   };

   // --- RECUPERAR PERSISTENCIA ---
   useEffect(() => {
      (async () => {
         const token = await SecureStore.getItemAsync("Token");
         const storedUser = await SecureStore.getItemAsync("userData");

         if (token) {
            if (isTokenValid(token)) {
               dispatchUser({ type: LOGIN, payload: JSON.parse(storedUser!) });
            } else {
               // token expirado → limpiar sesión
               await SecureStore.deleteItemAsync("Token");
               await SecureStore.deleteItemAsync("RefreshToken");
               await SecureStore.deleteItemAsync("userData");
               dispatchUser({ type: LOGOUT });
            }
         }
      })();
   }, []);

   const isTokenValid = (token: string): boolean => {
      try {
         const decoded: any = jwtDecode(token);

         // exp viene en segundos
         const now = Date.now() / 1000;

         return decoded.exp && decoded.exp > now;
      } catch (e) {
         return false;
      }
   };

   return (
      <UserContext.Provider
         value={{
            user,
            dispatchUser,
            login,
            logout,
         }}
      >
         {children}
      </UserContext.Provider>
   );
};

export default UserContext;
