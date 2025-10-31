// @context/UserContext.tsx
import { createContext, ReactNode, useReducer } from "react";
import { UserContextType, UserState } from "../interfaces/user.interfaces";

// ACTION TYPES
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

// INITIAL STATE
const initUser = (): UserState => {
   return {
      logged: false,
      infoUser: {},
   };
};

const initialState: UserState = {
   logged: false,
   infoUser: {},
};

// REDUCER
const userReducer = (state: UserState = initialState, action: any): UserState => {
   switch (action.type) {
      case LOGIN:
         return {
            logged: true,
            infoUser: action.payload || {},
         };
      case LOGOUT:
         return {
            logged: false,
            infoUser: {},
         };
      default:
         return state;
   }
};

// CONTEXT
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
   children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
   const [user, dispatchUser] = useReducer(userReducer, initialState, initUser);

   return <UserContext.Provider value={{ user, dispatchUser }}>{children}</UserContext.Provider>;
};

export default UserContext;
