import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { useNotificationStore } from "@/context/NotificationContext";
import { Feather } from "@expo/vector-icons";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
   const { notifications, clearNotifications, removeNotification } = useNotificationStore();

   // Handler para borrar todas con confirmación
   const handleClearAll = () => {
      Alert.alert("Borrar todas las notificaciones", "¿Estás seguro que deseas borrar todas las notificaciones?", [
         { text: "Cancelar", style: "cancel" },
         { text: "Borrar todas", style: "destructive", onPress: clearNotifications },
      ]);
   };

   return (
      <LayoutWithNavigation scrollable={false}>
         <View className="flex-1 bg-movapp-black mx-2 rounded-2xl p-2">
            {/* Header */}
            <View className="flex-row items-center justify-center mb-4">
               <Text className="text-white text-2xl font-bold text-center mb-2">Notificaciones</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
               {notifications.length === 0 && (
                  <View className="items-center mt-24">
                     <Feather name="bell-off" size={48} color="#444" />
                     <Text className="text-gray-400 text-base mt-4 text-center">
                        No tienes notificaciones recientes.
                     </Text>
                  </View>
               )}
               {notifications.map((n) => (
                  <View
                     key={n.id}
                     className="bg-movapp-card rounded-2xl p-4 mb-3 border border-movapp-borderCard border-opacity-20 flex-row"
                  >
                     <View className="flex-1">
                        <Text className="text-white font-semibold text-base">{n.title}</Text>
                        <Text className="text-gray-300 mt-1">{n.body}</Text>
                        <Text className="text-gray-500 text-xs mt-2">{new Date(n.date).toLocaleString()}</Text>
                     </View>

                     <TouchableOpacity onPress={() => removeNotification(n.id)}>
                        <Feather name="trash-2" size={18} color="#fff" />
                     </TouchableOpacity>
                  </View>
               ))}

               {notifications.length > 0 && (
                  <TouchableOpacity
                     className="bg-red-700/70 py-4 rounded-xl items-center mb-6"
                     activeOpacity={0.8}
                     onPress={handleClearAll}
                  >
                     <Text className="text-white text-lg font-bold">Borrar todas las notificaciones</Text>
                  </TouchableOpacity>
               )}
            </ScrollView>
         </View>
      </LayoutWithNavigation>
   );
}
