// app/(tabs)/colaborations.tsx
import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import VimeoPlayer from "@/components/VimeoPlayer";
import { Text, View } from "react-native";

export default function ColaborationsScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-4 text-center">Historias reales</Text>

         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <VimeoPlayer videoId="1147159629" autoplay={false} loop={false} muted={false} controls={true} />
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
