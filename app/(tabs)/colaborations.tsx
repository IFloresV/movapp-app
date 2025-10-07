// app/(tabs)/colaborations.tsx
import { useRouter } from "expo-router";
import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ColaborationScreen() {
   const router = useRouter();
   return (
      <LayoutWithNavigation scrollable={true}>
         {/* Colaboraciones */}
         <Text className="text-white text-2xl font-bold my-4 text-center">Colaboraciones</Text>
         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="owi6YB41tnM" play={false} />
            </View>
         </View>

         {/* Testimonios */}
         <Text className="text-white text-2xl font-bold my-4 text-center">Testimonios</Text>
         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="iiuid3nlolU" play={false} />
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
