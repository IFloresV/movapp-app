import ConfigContext from "@/context/ConfigContext";
import UserContext from "@/context/UserContext";
import { useRouter } from "expo-router";
import { useCallback, useContext } from "react";

export const useLogOut = () => {
   const { logout } = useContext(UserContext)!;
   const { dispatchConfig } = useContext(ConfigContext)!;
   const router = useRouter();

   const handleLogout = useCallback(async () => {
      // limpiar config
      dispatchConfig({ type: "CLEAR_CONFIG" });

      // cerrar sesión + SecureStore
      await logout();

      // redirigir
      router.replace("/");
   }, [dispatchConfig, logout, router]);

   return { logout: handleLogout };
};
