// app/(tabs)/colaborations.tsx
import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Text, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ColaborationScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-4 text-center">Historias reales</Text>

         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="gBBntkqht-k" play={false} />
            </View>
         </View>
         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="m0NlcYA3_oQ" play={false} />
            </View>
         </View>
         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="0GrXb0w0wSI" play={false} />
            </View>
         </View>

         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="ScKL3kS-0-U" play={false} />
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
