// components/DrawerMenu.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

   const handleItemPress = (route: string) => {
      onClose();
      setTimeout(() => {
         router.push(route as any);
      }, 300);
   };

   return (
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
         <Pressable className="flex-1 bg-movapp-background/70" onPress={onClose}>
            <Pressable
               className="absolute bottom-0 left-0 right-0 bg-movapp-linkBackground rounded-t-[64px] pb-6"
               onPress={(e) => e.stopPropagation()}>
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
               <ScrollView className="max-h-96 py-2">
                  {items.map((item, index) => (
                     <TouchableOpacity
                        key={item.name}
                        className={`flex-row items-center px-6 py-5 active:bg-gray-800 ${
                           index < items.length - 1 ? "border-b border-gray-800" : ""
                        }`}
                        onPress={() => handleItemPress(item.route)}>
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
                        <Feather name="chevron-right" size={20} color="#6b7280" />
                     </TouchableOpacity>
                  ))}
               </ScrollView>
            </Pressable>
         </Pressable>
      </Modal>
   );
}
