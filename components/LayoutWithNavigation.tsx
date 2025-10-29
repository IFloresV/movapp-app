// components/LayoutWithNavigation.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

interface LayoutWithNavigationProps {
   children: React.ReactNode;
   showHeader?: boolean;
   scrollable?: boolean;
}

export default function LayoutWithNavigation({
   children,
   showHeader = true,
   scrollable = true,
}: LayoutWithNavigationProps) {
   return (
      <LinearGradient
         colors={[Colors.movapp.backgroundTop, Colors.movapp.backgroundButton]}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 0.9 }}
         style={{ flex: 1 }}
      >
         {showHeader && <Header />}
         {scrollable ? (
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
               {children}
            </ScrollView>
         ) : (
            children
         )}
      </LinearGradient>
   );
}
