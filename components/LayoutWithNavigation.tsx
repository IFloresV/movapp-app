// components/LayoutWithNavigation.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native";

interface LayoutWithNavigationProps {
   children: React.ReactNode;
   showHeader?: boolean;
   scrollable?: boolean;
   showLogo?: boolean;
}

export default function LayoutWithNavigation({
   children,
   showHeader = true,
   scrollable = true,
   showLogo = true,
}: LayoutWithNavigationProps) {
   return (
      <LinearGradient
         colors={[Colors.movapp.backgroundTop, Colors.movapp.backgroundButton]}
         start={{ x: 0, y: 0 }}
         end={{ x: 0, y: 0.4 }}
         style={{ flex: 1 }}
      >
         {showHeader && <Header showLogo={showLogo} />}
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
