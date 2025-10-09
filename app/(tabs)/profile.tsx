// app/(tabs)/profile.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Purchase {
   id: string;
   title: string;
   price: string;
   date: string;
   img: string;
   bgColor: string;
}

export default function ProfileScreen() {
   const router = useRouter();

   // Datos de ejemplo - reemplazar con datos reales del usuario
   const userData = {
      name: "Iker Flores",
      email: "iker.flores@movapp.com",
      phone: "+34 678 123 456",
   };

   const purchases: Purchase[] = [
      {
         id: "1",
         title: "El Hack",
         price: "$500.00",
         date: "08 de Julio, 2025",
         img: "elhack",
         bgColor: "#00000",
      },
      {
         id: "2",
         title: "Guía de Meditación Consciente",
         price: "$250.00",
         date: "12 de Junio, 2025",
         img: "guia_meditacion",
         bgColor: "#F9A8D4",
      },
      {
         id: "3",
         title: "Taller de Inteligencia Emocional",
         price: "$250.00",
         date: "05 de Agosto, 2025",
         img: "taller_inteligencia_emocional",
         bgColor: "#FCA5A5",
      },
   ];

   const getImage = (name: string) => {
      switch (name) {
         case "elhack":
            return require("@/assets/images/elhack.png");
         case "guia_meditacion":
            return require("@/assets/images/guia_meditacion.png");
         case "taller_inteligencia_emocional":
            return require("@/assets/images/taller_inteligencia_emocional.png");
         default:
            return require("@/assets/images/elhack.png");
      }
   };

   return (
      <View className="flex-1 bg-black">
         <StatusBar style="light" />

         {/* Header */}
         <View className="pt-12 pb-4 px-4 flex-row items-center justify-between">
            <Text className="text-white text-xl font-bold">Mi Perfil</Text>
            <View className="flex-row items-center">
               <TouchableOpacity className="mr-4">
                  <Feather name="bell" size={22} color="white" />
               </TouchableOpacity>
            </View>
         </View>

         <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
            {/* Card Principal de Perfil */}
            <View className="bg-gray-800 rounded-3xl p-6 mb-4">
               <View className="items-center mb-6">
                  <Text className="text-white text-xl font-bold mb-1">{userData.name}</Text>
                  <Text className="text-gray-400 text-sm mb-4">{userData.email}</Text>
                  {/* <TouchableOpacity
                      onPress={() => router.push("/(tabs)/editProfile")}
                     className="px-8 py-2.5 rounded-xl border border-purple-500"
                     style={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  >
                     <Text className="text-purple-400 text-sm font-semibold">Editar Perfil</Text>
                  </TouchableOpacity> */}
               </View>

               {/* Información Personal */}
               <View className="bg-gray-900 rounded-2xl p-4">
                  <Text className="text-white text-base font-bold mb-4">Información Personal</Text>

                  {/* Teléfono */}
                  <View className="flex-row items-center mb-4">
                     <Feather name="phone" size={16} color="#9ca3af" />
                     <View className="ml-3 flex-1">
                        <Text className="text-gray-400 text-xs mb-0.5">Teléfono</Text>
                        <Text className="text-white text-sm font-medium">{userData.phone}</Text>
                     </View>
                  </View>

                  {/* Correo */}
                  <View className="flex-row items-center">
                     <Feather name="mail" size={16} color="#9ca3af" />
                     <View className="ml-3 flex-1">
                        <Text className="text-gray-400 text-xs mb-0.5">Correo electrónico</Text>
                        <Text className="text-white text-sm font-medium">{userData.email}</Text>
                     </View>
                  </View>
               </View>
            </View>

            {/* Historial de Compras */}
            <View className="bg-gray-800 rounded-3xl p-4 mb-4">
               <Text className="text-white text-base font-bold mb-4">Historial de Compras</Text>

               {purchases.map((purchase, index) => (
                  <TouchableOpacity
                     key={purchase.id}
                     className={`flex-row items-center ${index < purchases.length - 1 ? "mb-3" : ""}`}
                     activeOpacity={0.7}
                  >
                     {/* Icono con emoji */}
                     <View
                        className="w-14 h-14 rounded-2xl items-center justify-center mr-3"
                        style={{ backgroundColor: purchase.bgColor }}
                     >
                        <Image source={getImage(purchase.img)} className="w-12 h-12" />
                     </View>

                     {/* Info del curso */}
                     <View className="flex-1">
                        <Text className="text-white text-sm font-semibold mb-1" numberOfLines={1}>
                           {purchase.title}
                        </Text>
                        <Text className="text-gray-400 text-xs">{purchase.date}</Text>
                     </View>

                     {/* Precio */}
                     <Text className="text-purple-400 text-base font-bold ml-2">{purchase.price}</Text>
                  </TouchableOpacity>
               ))}
            </View>

            {/* Configuración */}
            <View className="bg-gray-800 rounded-3xl p-4 mb-6">
               <Text className="text-white text-base font-bold mb-4">Configuración</Text>

               {/* Preferencias de Notificación */}
               <TouchableOpacity
                  className="flex-row items-center justify-between py-3.5"
                  activeOpacity={0.7}
                  style={{ borderBottomWidth: 1, borderBottomColor: "#374151" }}
               >
                  <View className="flex-row items-center flex-1">
                     <Feather name="bell" size={20} color={Colors.movapp.primary} />
                     <Text className="text-white text-sm font-medium ml-3">Preferencias de Notificación</Text>
                  </View>
                  <View className="flex-row items-center">
                     <Text className="text-gray-400 text-xs mr-2">Activadas</Text>
                     <Feather name="chevron-right" size={18} color="#6b7280" />
                  </View>
               </TouchableOpacity>

               {/* Privacidad y Seguridad */}
               <TouchableOpacity
                  // onPress={() => router.push("/(tabs)/privacy")}
                  className="flex-row items-center justify-between py-3.5"
                  activeOpacity={0.7}
               >
                  <View className="flex-row items-center flex-1">
                     <Feather name="shield" size={20} color={Colors.movapp.primary} />
                     <Text className="text-white text-sm font-medium ml-3">Privacidad y Seguridad</Text>
                  </View>
                  <View className="flex-row items-center">
                     <Text className="text-gray-400 text-xs mr-2">Gestionar</Text>
                     <Feather name="chevron-right" size={18} color="#6b7280" />
                  </View>
               </TouchableOpacity>
            </View>

            {/* Botón Cerrar Sesión */}
            <TouchableOpacity
               onPress={() => {
                  // Lógica de cerrar sesión
                  router.replace("/(auth)/login");
               }}
               className="mb-8 py-4 rounded-2xl items-center"
               style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
               }}
               activeOpacity={0.8}
            >
               <Text className="text-red-500 text-base font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
}
