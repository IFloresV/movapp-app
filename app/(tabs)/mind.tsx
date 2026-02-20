// app/(tabs)/mind.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { VideoItem } from "@/components/VideoFeed";
import VimeoPlayerVertical from "@/components/VimeoPlayerVertical";
import React from "react";
import { Text, View } from "react-native";

const mindVideos: VideoItem[] = [
   { id: "1", videoId: "1164577391" },
   { id: "2", videoId: "1164575176" },
   { id: "3", videoId: "1164576426" },
   { id: "5", videoId: "1165530376" },
   { id: "6", videoId: "1165531010" },
   { id: "7", videoId: "1165531039" },
   { id: "8", videoId: "1165531088" },
   { id: "9", videoId: "1165547099" },
   { id: "10", videoId: "1165547542" },
   { id: "11", videoId: "1165547598" },
];

export default function MindScreen() {
   // Agrupar videos de a pares para 2 columnas
   const videoPairs = [];
   for (let i = 0; i < mindVideos.length; i += 2) {
      videoPairs.push(mindVideos.slice(i, i + 2));
   }

   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-1 text-center">Mente Digital</Text>
         {videoPairs.map((pair, idx) => (
            <View key={idx} className="flex-row px-4 mt-4">
               <VimeoPlayerVertical videos={pair.map((v) => ({ videoId: v.videoId }))} />
            </View>
         ))}
      </LayoutWithNavigation>
   );
}
