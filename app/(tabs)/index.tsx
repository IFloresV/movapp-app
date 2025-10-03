import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function MovappHomeScreen() {
   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black">
               {/* Header */}
               <View className="flex-row justify-between items-center px-4 py-3 pt-12">
                  <View className="w-8" />
                  <Text className="text-white text-2xl font-bold mt-8">Movapp</Text>
                  <TouchableOpacity>
                     <Ionicons name="notifications-outline" size={24} color="white" />
                  </TouchableOpacity>
               </View>

               {/* Video Section - YouTube */}
               <View className="px-4 mt-4">
                  <View className="w-full h-64 rounded-lg overflow-hidden">
                     <YoutubePlayer height={256} videoId="vNZxLXI75_U" play={false} />
                  </View>
               </View>

               {/* Menu Cards */}
               <View className="px-4 mt-8 pb-8">
                  {/* Colaboraciones y testimonios */}
                  <TouchableOpacity className="bg-gray-800 rounded-2xl p-5 flex-row items-center justify-between mb-4">
                     <View className="flex-row items-center flex-1">
                        <View className="bg-purple-600/20 p-3 rounded-xl mr-4">
                           <Ionicons name="book-outline" size={28} color="#a855f7" />
                        </View>
                        <View className="flex-1">
                           <Text className="text-white text-lg font-bold mb-1">Colaboraciones y testimonios</Text>
                           <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                        </View>
                     </View>
                     <Ionicons name="arrow-forward" size={24} color="#a855f7" />
                  </TouchableOpacity>

                  {/* Preguntas frecuentes */}
                  <TouchableOpacity className="bg-gray-800 rounded-2xl p-5 flex-row items-center justify-between mb-4">
                     <View className="flex-row items-center flex-1">
                        <View className="bg-purple-600/20 p-3 rounded-xl mr-4">
                           <Ionicons name="heart-outline" size={28} color="#a855f7" />
                        </View>
                        <View className="flex-1">
                           <Text className="text-white text-lg font-bold mb-1">Preguntas frecuentes</Text>
                           <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                        </View>
                     </View>
                     <Ionicons name="arrow-forward" size={24} color="#a855f7" />
                  </TouchableOpacity>

                  {/* El Hack */}
                  <TouchableOpacity className="bg-gray-800 rounded-2xl p-5 flex-row items-center justify-between">
                     <View className="flex-row items-center flex-1">
                        <View className="bg-purple-600/20 p-3 rounded-xl mr-4">
                           <Ionicons name="scale-outline" size={28} color="#a855f7" />
                        </View>
                        <View className="flex-1">
                           <Text className="text-white text-lg font-bold mb-1">El Hack</Text>
                           <Text className="text-gray-400 text-sm">Acceder a sección</Text>
                        </View>
                     </View>
                     <Ionicons name="arrow-forward" size={24} color="#a855f7" />
                  </TouchableOpacity>
               </View>
            </ScrollView>
         </LayoutWithNavigation>
      </>
   );
}
