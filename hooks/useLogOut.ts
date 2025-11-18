import ConfigContext from "@/context/ConfigContext";
import UserContext from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";

export const useLogOut = () => {
   const { logout } = useContext(UserContext)!;
   const { dispatchConfig } = useContext(ConfigContext)!;
   const [logOut, setLogOut] = useState(false);
   const router = useRouter();

   useEffect(() => {
      const LogoutAsync = async () => {
         if (!logOut) return;

         // limpiamos config
         dispatchConfig({ type: "CLEAR_CONFIG" });

         // limpiamos usuario + SecureStore
         await logout();

         router.replace("/");
      };

      LogoutAsync();
   }, [logOut]);

   return { setLogOut };
};
