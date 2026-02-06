// app/(tabs)/index.tsx

import { useRouter } from "expo-router";
import React from "react";

import { Text, TouchableOpacity, View } from "react-native";

import VimeoPlayer from "@/components/VimeoPlayer";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
   const router = useRouter();

   return (
      <LayoutWithNavigation scrollable={true}>
         {/* Video Banner - Vimeo */}
         <View className="px-4 mt-2">
            <View className="w-full h-56 rounded-lg overflow-hidden">
               <VimeoPlayer videoId="1147159129" autoplay={false} loop={false} muted={false} controls={true} />
            </View>
         </View>

         {/* Menu Cards */}
         <View className="px-4 mt-8 pb-8">
            {/* Colaboraciones y testimonios */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center justify-between mb-3"
               onPress={() => router.push("/colaborations")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-2.5 rounded-xl mr-3">
                     <FontAwesome6 name="people-group" size={20} color="#a855f7" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-base font-bold mb-0.5">Testimonios</Text>
                     <Text className="text-gray-400 text-xs">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={20} color="#a855f7" />
            </TouchableOpacity>
            {/* Preguntas frecuentes */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center justify-between mb-3"
               onPress={() => router.push("/faqs")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-2.5 rounded-xl mr-3">
                     <Feather name="message-circle" size={22} color="#a855f7" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-base font-bold mb-0.5">Preguntas frecuentes</Text>
                     <Text className="text-gray-400 text-xs">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={20} color="#a855f7" />
            </TouchableOpacity>
            {/* Mente digital */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center justify-between mb-3"
               onPress={() => router.push("/mind")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-2.5 rounded-xl mr-3">
                     <Feather name="heart" size={22} color={Colors.movapp.icon} />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-base font-bold mb-0.5">Mente Digital</Text>
                     <Text className="text-gray-400 text-xs">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={20} color="#a855f7" />
            </TouchableOpacity>

            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center justify-between mb-3"
               onPress={() => router.push("/trusted-apps")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-2.5 rounded-xl mr-3">
                     <FontAwesome6 name="credit-card-alt" size={22} color={Colors.movapp.icon} />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-base font-bold mb-0.5">Aplicaciones de préstamos confiables</Text>
                     <Text className="text-gray-400 text-xs">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={20} color="#a855f7" />
            </TouchableOpacity>

            {/* Linktree */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center justify-between mb-3"
               onPress={() => router.push("/linktree")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-2.5 rounded-xl mr-3">
                     <Ionicons name="link" size={22} color={Colors.movapp.icon} />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-base font-bold mb-0.5">Linktree</Text>
                     <Text className="text-gray-400 text-xs">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={20} color="#a855f7" />
            </TouchableOpacity>
         </View>
      </LayoutWithNavigation>
   );
}
