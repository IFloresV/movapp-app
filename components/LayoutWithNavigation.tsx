// components/LayoutWithNavigation.tsx
import Header from "@/components/Header";
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
      <LinearGradient colors={["#8149E2", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
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
