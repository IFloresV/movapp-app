// app/(tabs)/infiltrators.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import VimeoPlayerHorizontal from "@/components/VimeoPlayerHorizontal";
import { useModuleVideos } from "@/hooks/useModuleVideos";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function InfiltratorsScreen() {
   const { module, videos, loading, error, reload } = useModuleVideos("infiltrators");

   return (
      <LayoutWithNavigation scrollable={true}>
         <Text className="text-white text-2xl font-bold my-1 text-center">{module?.nombre ?? "Testimonios"}</Text>

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
            videos.map((video, idx) => (
               <View key={`${video.videoId}-${idx}`} className="px-4 mt-4">
                  <VimeoPlayerHorizontal videoId={video.videoId} />
               </View>
            ))}
      </LayoutWithNavigation>
   );
}
