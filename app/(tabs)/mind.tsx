// app/(tabs)/mind.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import VideoFeed, { VideoItem } from "@/components/VideoFeed";
import React from "react";
import { Text } from "react-native";

const mindVideos: VideoItem[] = [
   { id: "1", videoId: "1164575176" },
   { id: "2", videoId: "1164577391" },
   { id: "3", videoId: "1164576426" },
];

export default function MindScreen() {
   return (
      <LayoutWithNavigation scrollable={false}>
         <Text className="text-white text-2xl font-bold my-2 text-center">Mente Digital</Text>
         <VideoFeed videos={mindVideos} />
      </LayoutWithNavigation>
   );
}
