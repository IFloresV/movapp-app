import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { CartContext } from "@/context/CartContext";
import { useNotificationStore } from "@/context/NotificationContext"; // <-- Importa tu contexto de notificaciones

import { useContext } from "react";

interface HeaderProps {
   showNotifications?: boolean;
   showCart?: boolean;
   logoType?: 1 | 2;
}

const Header: React.FC<HeaderProps> = ({ showNotifications = true, showCart = true, logoType = 1 }) => {
   const router = useRouter();

   const { user } = useApp();
   const isLoggedIn = user.logged;

   const { cart } = useContext(CartContext)!;
   const itemsCount = Array.isArray(cart) ? cart.length : 0;

   // Notificaciones
   const { notifications } = useNotificationStore();
   const notificationsCount = notifications.length;

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
               <View style={{ width: 72 }} className="flex-row justify-end items-center space-x-2">
                  {showNotifications && isLoggedIn && notificationsCount > 0 && (
                     <TouchableOpacity className="mr-4" onPress={() => router.push("/notifications")}>
                        <View>
                           <Ionicons name="notifications-outline" size={24} color="white" />
                           {notificationsCount > 0 && (
                              <View
                                 style={{
                                    position: "absolute",
                                    right: -6,
                                    top: -6,
                                    backgroundColor: Colors.movapp.red || "#A78BFA",
                                    borderRadius: 10,
                                    minWidth: 18,
                                    height: 18,
                                    paddingHorizontal: 4,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: "rgba(255,255,255,0.12)",
                                 }}
                              >
                                 <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>
                                    {notificationsCount > 99 ? "99+" : notificationsCount}
                                 </Text>
                              </View>
                           )}
                        </View>
                     </TouchableOpacity>
                  )}

                  {/* mostrar icono de carrito solo si usuario logueado y carrito tiene items */}
                  {showCart && itemsCount > 0 && (
                     <TouchableOpacity onPress={() => router.push("/car")} style={{ marginLeft: 8 }}>
                        <View>
                           <Ionicons name="cart-outline" size={28} color="white" />
                           <View
                              style={{
                                 position: "absolute",
                                 right: -6,
                                 top: -6,
                                 backgroundColor: Colors.movapp.red || "#A78BFA",
                                 borderRadius: 10,
                                 minWidth: 18,
                                 height: 18,
                                 paddingHorizontal: 4,
                                 alignItems: "center",
                                 justifyContent: "center",
                                 borderWidth: 1,
                                 borderColor: "rgba(255,255,255,0.12)",
                              }}
                           >
                              <Text style={{ color: "#fff", fontSize: 11, fontWeight: "700" }}>
                                 {itemsCount > 99 ? "99+" : itemsCount}
                              </Text>
                           </View>
                        </View>
                     </TouchableOpacity>
                  )}
               </View>
            </View>
         </SafeAreaView>
      </>
   );
};

export default Header;
