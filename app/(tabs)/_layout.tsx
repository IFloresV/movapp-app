// app/(tabs)/_layout.tsx
import DrawerMenu, { DrawerMenuItem } from "@/components/DrawerMenu";
import { Colors } from "@/constants/Colors";
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
      route: "/(tabs)/store",
   },
   {
      name: "privacy",
      type: "feather",
      icon: "lock",
      label: "Politica de Privacidad",
      route: "/(tabs)/privacy",
   },
   {
      name: "conditions",
      type: "feather",
      icon: "check-circle",
      label: "Terminos y Condiciones",
      route: "/(tabs)/conditions",
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

            <Tabs.Screen name="privacy" options={{ href: null }} />
            <Tabs.Screen name="conditions" options={{ href: null }} />
         </Tabs>

         {/* Drawer Menu Component */}
         <DrawerMenu visible={drawerVisible} onClose={() => setDrawerVisible(false)} items={DRAWER_MENU_ITEMS} />
      </>
   );
}
