// components/LayoutWithNavigation.tsx
import Header from "@/components/Header";
import { ScrollView, View } from "react-native";

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
   const content = (
      <View className="flex-1 bg-movapp-background">
         {showHeader && <Header />}
         {children}
      </View>
   );

   if (scrollable) {
      return (
         <ScrollView className="flex-1 bg-movapp-background" showsVerticalScrollIndicator={false}>
            {showHeader && <Header />}
            {children}
         </ScrollView>
      );
   }

   return content;
}
