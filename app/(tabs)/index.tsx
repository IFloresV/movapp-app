// app/(tabs)/index.tsx

import { useRouter } from "expo-router";
import React, { useContext } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import UserContext from "@/context/UserContext";

import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
   const { user } = useContext(UserContext)!;
   console.log("user desde home", user);
   const router = useRouter();
   return (
      <LayoutWithNavigation scrollable={true}>
         {/* Video Section - YouTube */}
         <View className="px-4 mt-4">
            <View className="w-full h-64 rounded-lg overflow-hidden">
               <YoutubePlayer height={256} videoId="vNZxLXI75_U" play={false} />
            </View>
         </View>

         {/* Menu Cards */}
         <View className="px-4 mt-8 pb-8">
            {/* Colaboraciones y testimonios */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-5 flex-row items-center justify-between mb-4"
               onPress={() => router.push("/colaborations")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-3 rounded-xl mr-4">
                     <FontAwesome name="handshake-o" size={24} color="#a855f7" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-lg font-bold mb-1">Colaboraciones y testimonios</Text>
                     <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={24} color="#a855f7" />
            </TouchableOpacity>
            {/* Preguntas frecuentes */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-5 flex-row items-center justify-between mb-4"
               onPress={() => router.push("/faqs")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-3 rounded-xl mr-4">
                     <Feather name="message-circle" size={26} color="#a855f7" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-lg font-bold mb-1">Preguntas frecuentes</Text>
                     <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={24} color="#a855f7" />
            </TouchableOpacity>
            {/* Mente digital */}
            <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-5 flex-row items-center justify-between mb-4"
               onPress={() => router.push("/mind")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-3 rounded-xl mr-4">
                     <Feather name="heart" size={26} color={Colors.movapp.icon} />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-lg font-bold mb-1">Mente digital</Text>
                     <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={24} color="#a855f7" />
            </TouchableOpacity>
            {/* Reels */}
            {/* <TouchableOpacity
               className="bg-movapp-linkBackgroundHome rounded-2xl p-5 flex-row items-center justify-between mb-4"
               onPress={() => router.push("/reels")}
            >
               <View className="flex-row items-center flex-1">
                  <View className="bg-movapp-primary/20 p-3 rounded-xl mr-4">
                     <Feather name="heart" size={26} color="#a855f7" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-white text-lg font-bold mb-1">Reels</Text>
                     <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                  </View>
               </View>
               <Ionicons name="arrow-forward" size={24} color="#a855f7" />
            </TouchableOpacity> */}
         </View>
      </LayoutWithNavigation>
   );
}
