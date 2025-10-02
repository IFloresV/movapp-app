// import UserContext from "@/context/UserContext";
// import { useLogOut } from "@/hooks/useLogOut";
import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Animated, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: screenWidth } = Dimensions.get("window");

interface NavigationItem {
   name: string;
   icon: keyof typeof Feather.glyphMap;
   route: string;
   label: string;
}

// ICONOS CORREGIDOS
const navigationItems: NavigationItem[] = [
   {
      name: "inicio",
      icon: "home",
      route: "/",
      label: "Inicio",
   },
   {
      name: "store",
      icon: "shopping-bag",
      route: "/store",
      label: "Tienda",
   },
   {
      name: "courses",
      icon: "book", // CAMBIADO de shopping-cart a info
      route: "/courses",
      label: "Cursos", // CORREGIDO ortografía
   },
   {
      name: "profile",
      icon: "user", // CAMBIADO de shopping-cart a info
      route: "/profile",
      label: "Perfiles", // CORREGIDO ortografía
   },
];

// Rutas que no existen aún - mostrar mensaje "próximamente"

export default function BottomNavigation() {
   const router = useRouter();
   const pathname = usePathname();
   const [drawerVisible, setDrawerVisible] = useState(false);
   const [slideAnim] = useState(new Animated.Value(screenWidth));
   // const { setLogOut } = useLogOut();

   const insets = useSafeAreaInsets();
   // const userContext = useContext(UserContext);
   // const userName = userContext?.user?.infoUser?.nombreLider || "Usuario";

   const openDrawer = () => {
      setDrawerVisible(true);
      Animated.timing(slideAnim, {
         toValue: 0,
         duration: 300,
         useNativeDriver: true,
      }).start();
   };

   const closeDrawer = () => {
      Animated.timing(slideAnim, {
         toValue: screenWidth,
         duration: 300,
         useNativeDriver: true,
      }).start(() => {
         setDrawerVisible(false);
      });
   };

   // FUNCIÓN MEJORADA - Solo permite rutas que existen
   const handleNavigation = (route: string) => {
      try {
         // Solo navegar a rutas que sabemos que existen
         if (route === "/" || route === "/store" || route === "/courses" || route === "/profile") {
            router.push(route);
         } else {
            Alert.alert("Próximamente", "Esta funcionalidad estará disponible pronto.", [{ text: "OK" }]);
         }
      } catch (error) {
         console.error(`Error navigating to ${route}:`, error);
         Alert.alert("Error", "No se pudo navegar a esta pantalla");
      }
   };

   const isActive = (route: string) => {
      return pathname === route;
   };

   return (
      <>
         <View
            className="absolute bottom-0 left-0 right-0 bg-mn-base rounded-t-3xl shadow-lg"
            style={{
               paddingBottom: insets.bottom,
               marginBottom: 0,
            }}
         >
            <View className="flex-row items-center justify-around py-2 px-4">
               {/* Navigation Items */}
               {navigationItems.map((item) => (
                  <TouchableOpacity
                     key={item.name}
                     onPress={() => handleNavigation(item.route)}
                     className="flex-1 items-center py-2"
                  >
                     <View className={`p-2 rounded-full ${isActive(item.route) ? "bg-white/20" : ""}`}>
                        <Feather name={item.icon} size={24} color="white" />
                     </View>
                     <Text className={`text-xs mt-1 text-white ${isActive(item.route) ? "font-medium" : ""}`}>
                        {item.label}
                     </Text>
                  </TouchableOpacity>
               ))}

               {/* More Options Button */}
               {/* <TouchableOpacity onPress={openDrawer} className="flex-1 items-center py-2">
                  <View className="p-2 rounded-full">
                     <Feather name="more-horizontal" size={24} color="white" />
                  </View>
                  <Text className="text-xs mt-1 text-white">Más</Text>
               </TouchableOpacity> */}
            </View>
         </View>
      </>
   );
}
