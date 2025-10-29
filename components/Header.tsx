import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HeaderProps {
   showNotifications?: boolean;
   showCart?: boolean;
   logoType?: 1 | 2;
}

const Header: React.FC<HeaderProps> = ({ showNotifications = true, showCart = true, logoType = 1 }) => {
   const router = useRouter();

   return (
      <>
         <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

         <SafeAreaView className="bg-transparent" edges={["top", "left", "right"]}>
            <View className="flex-row items-center justify-between px-4 pt-2 pb-3">
               {/* Espaciador izquierdo (mismo ancho que los iconos) */}
               <View style={{ width: 72 }} />

               {/* Logo centrado */}
               <View className="items-center justify-center flex-1">
                  <Image
                     source={
                        logoType === 1 ? require("@/assets/images/MovappBl.png") : require("@/assets/images/Movapp.png")
                     }
                     style={{ width: 100, height: 40 }}
                     resizeMode="contain"
                  />
               </View>

               {/* Iconos a la derecha */}
               <View style={{ width: 72 }} className="flex-row justify-end items-center space-x-6">
                  {showNotifications && (
                     <TouchableOpacity className="mr-4">
                        <Ionicons name="notifications-outline" size={24} color="white" />
                     </TouchableOpacity>
                  )}
                  {showCart && (
                     <TouchableOpacity onPress={() => router.push("/car")}>
                        <Ionicons name="cart-outline" size={24} color="white" />
                     </TouchableOpacity>
                  )}
               </View>
            </View>
         </SafeAreaView>
      </>
   );
};

export default Header;
