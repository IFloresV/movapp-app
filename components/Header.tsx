import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header({ title = "" }) {
   return (
      <View className="flex-row justify-between items-center px-4 py-3 pt-12">
         <View className="w-8" />
         <Text className="text-white text-2xl font-bold mt-8">{title}</Text>
         <View className="flex-row space-x-4 mt-8">
            <TouchableOpacity className="mr-3">
               <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="mr-3">
               <Ionicons name="cart-outline" size={24} color="white" />
            </TouchableOpacity>
         </View>
      </View>
   );
}
