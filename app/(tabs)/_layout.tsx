import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image } from "react-native";

type TabIconConfig =
   | { type: "feather"; icon: keyof typeof Feather.glyphMap; label: string }
   | { type: "image"; icon: any; label: string };

const TAB_CONFIG: Record<string, TabIconConfig> = {
   index: { type: "feather", icon: "home", label: "Inicio" },
   store: { type: "feather", icon: "shopping-bag", label: "Tienda" },
   hack: {
      type: "image",
      icon: require("@/assets/icons/elhack.png"),
      label: "El Hack",
   },
   courses: { type: "feather", icon: "book", label: "Cursos" },
   profile: { type: "feather", icon: "user", label: "Perfil" },
};

const renderTabIcon = (config: TabIconConfig, color: string, size: number) => {
   if (config.type === "image") {
      return (
         <Image
            source={config.icon}
            style={{ width: size + 50, height: size + 50, tintColor: color }}
            resizeMode="contain"
         />
      );
   }

   return <Feather name={config.icon} size={size} color={color} />;
};

export default function TabsLayout() {
   return (
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
               tabBarActiveTintColor: Colors.movapp.purple,
               tabBarInactiveTintColor: "#e0e0e0",
               tabBarIcon: ({ color, size }) => renderTabIcon(config, color, size),
               tabBarShowLabel: false,
            };
         }}>
         {Object.keys(TAB_CONFIG).map((name) => (
            <Tabs.Screen key={name} name={name} />
         ))}
      </Tabs>
   );
}
