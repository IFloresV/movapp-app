// app/(tabs)/_layout.tsx
import DrawerMenu, { DrawerMenuItem } from "@/components/DrawerMenu";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";

type TabIconConfig =
   | { type: "feather"; icon: keyof typeof Feather.glyphMap; label: string }
   | { type: "image"; icon: any; label: string; size?: number; width?: number; height?: number };

const TAB_CONFIG: Record<string, TabIconConfig> = {
   index: {
      type: "image",
      icon: require("@/assets/icons/movapp-m.png"),
      label: "Inicio",
      size: 10,
      height: 35,
   },
   hack: {
      type: "image",
      icon: require("@/assets/icons/elhack.png"),
      label: "El Hack",
      size: 70,
      height: 50,
   },
};

const DRAWER_MENU_ITEMS: DrawerMenuItem[] = [
   {
      name: "profile",
      type: "feather",
      icon: "user",
      label: "Perfil",
      route: "/(tabs)/profile",
   },
   {
      name: "store",
      type: "feather",
      icon: "shopping-bag",
      label: "Tienda",
      route: "/(tabs)/hack",
   },
   {
      name: "contacts",
      type: "feather",
      icon: "phone",
      label: "Verifica tu asesor",
      route: "/(tabs)/contacts",
   },

   {
      name: "register",
      type: "feather",
      icon: "check-circle",
      label: "Registrarse",
      route: "/(auth)/register",
   },
   {
      name: "login",
      type: "feather",
      icon: "log-in",
      label: "Login",
      route: "/(auth)/login",
   },
];

const renderTabIcon = (config: TabIconConfig & { width?: number; height?: number }, color: string, size: number) => {
   if (config.type === "image") {
      return (
         <Image
            source={config.icon}
            style={{
               width: config.width ?? size + 50,
               height: config.height ?? size + 50,
               tintColor: color,
            }}
            resizeMode="contain"
         />
      );
   }
   return <Feather name={config.icon} size={size} color={color} />;
};

export default function TabsLayout() {
   const [drawerVisible, setDrawerVisible] = useState(false);

   // ✅ Usar el nuevo contexto unificado
   const { user, isHydrated } = useApp();

   // ✅ Esperar a que se complete la hidratación
   if (!isHydrated) {
      return null;
   }

   const isLoggedIn = user.logged;

   const filteredDrawerItems = DRAWER_MENU_ITEMS.filter((item) => {
      if (!isLoggedIn && item.name === "profile") return false;
      // if (!isLoggedIn && item.name === "store") return false;
      if (isLoggedIn && item.name === "register") return false;
      if (isLoggedIn && item.name === "login") return false;
      return true;
   });

   return (
      <>
         <Tabs
            screenOptions={({ route }) => {
               const config = TAB_CONFIG[route.name];

               return {
                  headerShown: false,
                  tabBarStyle: {
                     backgroundColor: Colors.movapp.bgTabsNav,
                     borderTopWidth: 0,
                     paddingTop: 10,
                     paddingBottom: 10,
                     height: 100,
                  },
                  tabBarActiveTintColor: Colors.movapp.primary,
                  tabBarInactiveTintColor: Colors.movapp.text,
                  tabBarIcon: ({ color, size }) => (config ? renderTabIcon(config, color, size) : null),
                  tabBarShowLabel: false,
                  swipeEnabled: true,
               };
            }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="hack" />

            {/* Botón del menú hamburguesa */}
            <Tabs.Screen
               name="menu"
               options={{
                  tabBarIcon: ({ color, size }) => <Feather name="align-right" size={size} color={color} />,
                  tabBarButton: (props) => (
                     <View style={props.style}>
                        <Pressable onPress={() => setDrawerVisible(true)}>{props.children}</Pressable>
                     </View>
                  ),
               }}
               listeners={{
                  tabPress: (e) => {
                     e.preventDefault();
                  },
               }}
            />

            {/* Pantallas ocultas del tab bar pero accesibles por navegación */}
            <Tabs.Screen name="car" options={{ href: null }} />
            <Tabs.Screen name="colaborations" options={{ href: null }} />
            <Tabs.Screen name="faqs" options={{ href: null }} />
            <Tabs.Screen name="mind" options={{ href: null }} />
            <Tabs.Screen name="profile" options={{ href: null }} />
            <Tabs.Screen name="store" options={{ href: null }} />
            <Tabs.Screen name="payments/success" options={{ href: null }} />
            <Tabs.Screen name="notifications" options={{ href: null }} />
            <Tabs.Screen name="payment-access" options={{ href: null }} />
            <Tabs.Screen name="trusted-apps" options={{ href: null }} />
            <Tabs.Screen name="linktree" options={{ href: null }} />
            <Tabs.Screen name="contacts" options={{ href: null }} />
            <Tabs.Screen name="debt-repair" options={{ href: null }} />
         </Tabs>

         {/* Drawer Menu Component */}
         <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} items={filteredDrawerItems} />
      </>
   );
}
