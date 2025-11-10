import { useEffect } from "react";
import { Image } from "react-native";

export default function SplashScreen({ onFinish = (isCancelled) => {} }: { onFinish: (isCancelled: boolean) => void }) {
   useEffect(() => {
      const timer = setTimeout(() => onFinish(false), 3000);
      return () => clearTimeout(timer);
   }, [onFinish]);

   return (
      <Image
         source={require("@/assets/images/SplashScreenMovapp.gif")}
         style={{ flex: 1, width: "100%", resizeMode: "cover" }}
      />
   );
}
