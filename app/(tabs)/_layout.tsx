import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

const TAB_CONFIG = {
   index: { icon: "home", label: "Inicio" },
   store: { icon: "shopping-bag", label: "Tienda" },
   courses: { icon: "book", label: "Cursos" },
   profile: { icon: "user", label: "Perfil" },
} as const;

export default function TabsLayout() {
   return (
      <Tabs
         screenOptions={({ route }) => {
            const { icon, label } = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

            return {
               headerShown: false,
               tabBarStyle: {
                  backgroundColor: Colors.movapp.bgTabsNav,
                  borderTopWidth: 0,
               },
               tabBarActiveTintColor: Colors.movapp.purple,
               tabBarInactiveTintColor: "#e0e0e0",
               tabBarIcon: ({ color, size }) => <Feather name={icon} size={size} color={color} />,
               tabBarLabel: ({ focused, color }) => (
                  <Text
                     style={{
                        color,
                        fontWeight: focused ? "bold" : "normal",
                        fontSize: 12,
                     }}
                  >
                     {label}
                  </Text>
               ),
            };
         }}
      >
         {Object.keys(TAB_CONFIG).map((name) => (
            <Tabs.Screen key={name} name={name} />
         ))}
      </Tabs>
   );
}
