import { useApp } from "@/context/AppContext";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export const useLogOut = () => {
   const { logout, clearConfig } = useApp();
   const router = useRouter();

   const handleLogout = useCallback(async () => {
      try {
         clearConfig();
         await logout();
         router.replace("/");
      } catch (error) {
         console.log("\x1b[31m[useLogOut] ❌ Error en logout:", error);
      }
   }, [logout, clearConfig, router]);

   return { logout: handleLogout };
};
