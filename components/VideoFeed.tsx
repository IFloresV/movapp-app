// components/VideoFeed.tsx
import VimeoPlayer from "@/components/VimeoPlayer";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, View, ViewToken } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const VIDEO_HEIGHT = SCREEN_HEIGHT * 0.73;
const VIDEO_WIDTH = SCREEN_WIDTH * 0.92;

export interface VideoItem {
   id: string;
   videoId: string;
}

interface VideoFeedProps {
   videos: VideoItem[];
}

export default function VideoFeed({ videos }: VideoFeedProps) {
   const [activeVideoIndex, setActiveVideoIndex] = useState(0);
   const flatListRef = useRef<FlatList>(null);

   const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
         const index = viewableItems[0].index ?? 0;
         setActiveVideoIndex(index);
      }
   }).current;

   const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 50,
   }).current;

   const renderItem = ({ item, index }: { item: VideoItem; index: number }) => {
      const isActive = index === activeVideoIndex;

      return (
         <View
            style={{
               width: SCREEN_WIDTH,
               height: VIDEO_HEIGHT,
               justifyContent: "center",
               alignItems: "center",
               paddingVertical: 8,
            }}>
            <View
               style={{
                  width: VIDEO_WIDTH,
                  height: VIDEO_HEIGHT - 16,
                  borderRadius: 20,
                  overflow: "hidden",
                  backgroundColor: "#1a1a1a",
                  shadowColor: "#000",
                  shadowOffset: {
                     width: 0,
                     height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 8,
               }}>
               <VimeoPlayer
                  key={isActive ? item.videoId : undefined}
                  videoId={item.videoId}
                  autoplay={isActive}
                  loop={false}
                  muted={false}
                  controls={true}
                  allowsFullscreenVideo={false}
                  style={{ flex: 1, width: "100%", height: "100%" }}
               />
            </View>
         </View>
      );
   };

   return (
      <FlatList
         ref={flatListRef}
         data={videos}
         renderItem={renderItem}
         keyExtractor={(item) => item.id}
         pagingEnabled
         showsVerticalScrollIndicator={false}
         snapToInterval={VIDEO_HEIGHT}
         snapToAlignment="center"
         decelerationRate="normal"
         onViewableItemsChanged={onViewableItemsChanged}
         viewabilityConfig={viewabilityConfig}
         removeClippedSubviews={false}
         initialNumToRender={3}
         maxToRenderPerBatch={1}
         windowSize={3}
         contentContainerStyle={{
            paddingVertical: 8,
         }}
      />
   );
}
