// app/(tabs)/mind.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import VimeoPlayerVertical from "@/components/VimeoPlayerVertical";
import { useModuleVideos } from "@/hooks/useModuleVideos";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function MindScreen() {
   const { module, videos, loading, error, reload } = useModuleVideos("mind");

   const videoPairs: { videoId: string }[][] = [];
   for (let i = 0; i < videos.length; i += 2) {
      videoPairs.push(videos.slice(i, i + 2).map((v) => ({ videoId: v.videoId })));
   }

   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-1 text-center">{module?.nombre ?? "Mente Digital"}</Text>

         {loading && (
            <View className="py-12 items-center">
               <ActivityIndicator size="large" color="#a855f7" />
            </View>
         )}

         {!loading && error && (
            <View className="py-12 items-center px-6">
               <Text className="text-white text-base text-center mb-4">{error}</Text>
               <Pressable onPress={reload}>
                  <Text className="text-movapp-icon underline">Reintentar</Text>
               </Pressable>
            </View>
         )}

         {!loading &&
            !error &&
            videoPairs.map((pair, idx) => (
               <View key={idx} className="flex-row px-4 mt-4">
                  <VimeoPlayerVertical videos={pair} />
               </View>
            ))}
      </LayoutWithNavigation>
   );
}
