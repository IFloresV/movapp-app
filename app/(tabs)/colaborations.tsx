// app/(tabs)/index.tsx
import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Text, View } from "react-native";

export default function ColaborationsScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="bg-gradient-to-r from-movapp-blue to-movapp-black p-6 m-4 rounded-xl mt-48">
            <Text className="text-white text-2xl font-bold text-center mb-2"> Colaboraciones </Text>
         </View>
      </LayoutWithNavigation>
   );
}
