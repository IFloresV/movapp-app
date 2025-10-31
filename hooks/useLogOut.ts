import ConfigContext from "@/context/ConfigContext";
import UserContext from "@/context/UserContext";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { useContext, useEffect, useState } from "react";

export const useLogOut = () => {
   const { dispatchUser } = useContext(UserContext)!;
   const { dispatchConfig } = useContext(ConfigContext)!;
   const [logOut, setLogOut] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const Logout = async () => {
         if (logOut) {
            await SecureStore.deleteItemAsync("Token");
            await SecureStore.deleteItemAsync("RefreshToken");

            dispatchConfig({ type: "CLEAR_CONFIG" });
            dispatchUser({ type: "LOGOUT" });
            router.push("/");
         }
      };
      Logout();
   }, [logOut]);

   return { setLogOut };
};
