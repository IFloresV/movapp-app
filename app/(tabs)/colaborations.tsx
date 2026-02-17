// app/(tabs)/colaborations.tsx
import React from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import VimeoPlayer from "@/components/VimeoPlayer";
import { Text, View } from "react-native";

interface VideoItem {
   id: string;
   videoId: string;
}

const videos: VideoItem[] = [
   { id: "1", videoId: "1147159629" },
   { id: "2", videoId: "1147159682" },
];

export default function ColaborationsScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-4 text-center">Testimonios</Text>

         {videos.map((video) => (
            <View key={video.id} className="px-4 mt-4">
               <View className="w-full h-64 rounded-lg overflow-hidden">
                  <VimeoPlayer videoId={video.videoId} autoplay={false} loop={false} muted={false} controls={true} />
               </View>
            </View>
         ))}
      </LayoutWithNavigation>
   );
}
