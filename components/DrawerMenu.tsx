// components/DrawerMenu.tsx
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { useLogOut } from "@/hooks/useLogOut";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Image, Linking, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Info } from "@/constants/Info";
import Constants from "expo-constants";

export type DrawerMenuItem = {
   name: string;
   type: "feather" | "image";
   icon: keyof typeof Feather.glyphMap | any;
   label: string;
   route: string;
};

interface DrawerMenuProps {
   visible: boolean;
   onClose: () => void;
   items: DrawerMenuItem[];
}

export default function DrawerMenu({ visible, onClose, items }: DrawerMenuProps) {
   const router = useRouter();
   const { user } = useApp();
   const { logout } = useLogOut();
   const isLoggedIn = user.logged;
   const { whatsappNumber } = Info;

   const handleItemPress = (route: string) => {
      onClose();
      setTimeout(() => {
         router.push(route as any);
      }, 300);
   };

   const handleLogout = async () => {
      onClose();
      await logout();
   };

   const handleWhatsAppPress = async () => {
      if (!isLoggedIn) {
         Alert.alert("Inicia Sesión", "Debes iniciar sesión para contactarnos por WhatsApp");
         return;
      }

      if (!whatsappNumber) {
         Alert.alert("Error", "Número de WhatsApp no configurado");
         return;
      }

      const cleanNumber = whatsappNumber.replace(/\D/g, "");
      const message = "Hola,¿podrían ayudarme?";
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

      try {
         await Linking.openURL(whatsappUrl);
         onClose();
      } catch (error) {
         console.log("Error opening WhatsApp:", error);
         Alert.alert("Error", "No se pudo abrir WhatsApp. Intenta nuevamente.");
      }
   };

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
         <SafeAreaView style={{ flex: 1, backgroundColor: Colors.movapp.linkBackgroundHome }}>
            <Pressable style={{ flex: 1 }} onPress={onClose}>
               <Pressable
                  className="absolute bottom-0 left-0 right-0 bg-movapp-linkBackground rounded-t-[20px] overflow-hidden"
                  style={{ height: "100%" }}
                  onPress={(e) => e.stopPropagation()}
               >
                  <View
                     style={{
                        height: 48,
                        backgroundColor: Colors.movapp.background,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                     }}
                  />

                  {/* Header */}
                  <View className="flex-row justify-between items-center px-6 pt-6 pb-4 border-b bg-movapp-linkBackground border-movapp-linkBackground">
                     <Image
                        source={require("@/assets/images/Movapp.png")}
                        style={{ width: 120, height: 32 }}
                        resizeMode="contain"
                     />
                     <TouchableOpacity onPress={onClose} className="p-2">
                        <Feather name="x" size={24} color={Colors.movapp.text} />
                     </TouchableOpacity>
                  </View>

                  {/* Items */}
                  <ScrollView className="py-2">
                     {items.map((item, index) => (
                        <TouchableOpacity
                           key={item.name}
                           className="flex-row items-center px-6 py-5 active:bg-gray-800 border-b border-gray-800"
                           onPress={() => handleItemPress(item.route)}
                        >
                           {/* Icono con fondo */}
                           <View className="bg-movapp-linkIcon/20 p-3 rounded-xl mr-4">
                              {item.type === "image" ? (
                                 <Image
                                    source={item.icon}
                                    style={{
                                       width: 8,
                                       height: 8,
                                       tintColor: Colors.movapp.bgTabsNav,
                                    }}
                                    resizeMode="contain"
                                 />
                              ) : (
                                 <Feather name={item.icon as any} size={24} color={Colors.movapp.primary} />
                              )}
                           </View>

                           {/* Label */}
                           <Text className="text-white text-lg font-semibold flex-1">{item.label}</Text>

                           {/* Flecha */}
                           <Feather name="chevron-right" size={20} color={Colors.movapp.linkIcon} />
                        </TouchableOpacity>
                     ))}

                     {/* WhatsApp Button */}
                     {isLoggedIn && (
                        <TouchableOpacity
                           key="whatsapp"
                           className="flex-row items-center px-6 py-5 active:bg-green-900 border-b border-gray-800"
                           onPress={handleWhatsAppPress}
                        >
                           {/* Icono con fondo */}
                           <View className="bg-green-500/20 p-3 rounded-xl mr-4">
                              <FontAwesome name="whatsapp" size={24} color="#25D366" />
                           </View>

                           {/* Label */}
                           <Text className="text-green-400 text-lg font-semibold flex-1">Contactar por WhatsApp</Text>

                           {/* Flecha */}
                           <Feather name="chevron-right" size={20} color="#25D366" />
                        </TouchableOpacity>
                     )}

                     {/* Logout */}
                     {isLoggedIn && (
                        <TouchableOpacity
                           key="logout"
                           className="flex-row items-center px-6 py-5 active:bg-red-800"
                           onPress={handleLogout}
                        >
                           <View className="bg-red-500/30 p-3 rounded-xl mr-4">
                              <Feather name="log-out" size={24} color="#A60D14" />
                           </View>

                           <Text className="text-red-500 text-lg font-semibold flex-1">Cerrar Sesión</Text>
                        </TouchableOpacity>
                     )}
                  </ScrollView>

                  {/* Version Info */}
                  <View style={{ paddingVertical: 40, backgroundColor: Colors.movapp.linkBackground }}>
                     <Text className="text-xs text-center" style={{ color: Colors.movapp.icon }}>
                        Versión {Constants.expoConfig?.version || "1.0.0"}
                     </Text>
                  </View>
               </Pressable>
            </Pressable>
         </SafeAreaView>
      </Modal>
   );
}
