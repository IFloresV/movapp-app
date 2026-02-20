// app/(tabs)/colaborations.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { VideoItem } from "@/components/VideoFeed";
import VimeoPlayerVertical from "@/components/VimeoPlayerVertical";
import React from "react";
import { Text, View } from "react-native";

const mindVideos: VideoItem[] = [
   { id: "1", videoId: "1166399438" },
   { id: "2", videoId: "1166399565" },
   { id: "3", videoId: "1166404006" },
   { id: "4", videoId: "1166404194" },
   { id: "5", videoId: "1166404382" },
   { id: "6", videoId: "1166404548" },
   { id: "7", videoId: "1166404748" },
   { id: "8", videoId: "1166404979" },
   { id: "9", videoId: "1166405267" },
   { id: "10", videoId: "1166405419" },
   { id: "11", videoId: "1166405577" },
   { id: "12", videoId: "1166405733" },
   { id: "13", videoId: "1166405909" },
];

export default function ColaborationsScreen() {
   const videoPairs = [];
   for (let i = 0; i < mindVideos.length; i += 2) {
      videoPairs.push(mindVideos.slice(i, i + 2));
   }

   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-1 text-center">Testimonios</Text>
         {videoPairs.map((pair, idx) => (
            <View key={idx} className="flex-row px-4 mt-4">
               <VimeoPlayerVertical videos={pair.map((v) => ({ videoId: v.videoId }))} />
            </View>
         ))}
      </LayoutWithNavigation>
   );
}
