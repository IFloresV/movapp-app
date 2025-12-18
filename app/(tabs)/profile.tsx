// app/(tabs)/profile.tsx
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { getFlag } from "@/utils/Flags";
import { getImage } from "@/utils/Images";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

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

   // ✅ Solo necesitas useApp - ya tiene todo
   const { user, config, logout } = useApp();

   const isLoggedIn = user.logged;
   const userData = user.infoUser;
   const paises = config.paises;

   // ✅ Debug logs
   console.log("👤 [Profile] userData:", userData);
   console.log("👤 [Profile] pais_id del usuario:", userData?.pais_id);
   console.log("🌍 [Profile] Total países cargados:", paises?.length || 0);
   console.log("🌍 [Profile] Países:", paises);

   // ✅ Función de logout simplificada - usa la del contexto
   const handleLogout = async () => {
      Alert.alert("Cerrar Sesión", "¿Estás seguro que deseas cerrar sesión?", [
         { text: "Cancelar", style: "cancel" },
         {
            text: "Cerrar Sesión",
            style: "destructive",
            onPress: async () => {
               try {
                  console.log("\x1b[31m[Profile] Cerrando sesión...");
                  await logout();
                  Alert.alert("Sesión cerrada", "Has cerrado tu sesión correctamente.");
                  router.replace("/(auth)/login");
               } catch (error) {
                  console.error("Error al cerrar sesión:", error);
                  Alert.alert("Error", "No se pudo cerrar la sesión");
               }
            },
         },
      ]);
   };

   const purchases: Purchase[] = [
      // {
      //    id: "1",
      //    title: "El Hack",
      //    price: "$500.00",
      //    date: "08 de Julio, 2025",
      //    img: "PROD-001",
      //    bgColor: "#000000",
      // },
      // {
      //    id: "2",
      //    title: "Guía de Meditación Consciente",
      //    price: "$250.00",
      //    date: "12 de Junio, 2025",
      //    img: "PROD-002",
      //    bgColor: "#000000",
      // },
   ];

   // ✅ Buscar país por ID del usuario
   const selectedCountry = paises.find((p) => p.id === userData?.pais_id);

   console.log("🏳️ [Profile] País encontrado:", selectedCountry);

   const countryCode = selectedCountry?.codigo_pais || "MX";
   const country = selectedCountry?.nombre || selectedCountry?.pais || "Cargando...";

   console.log("🏳️ [Profile] Código país:", countryCode);
   console.log("🏳️ [Profile] Nombre país:", country);

   return (
      <View className="flex-1 bg-black">
         <Header showNotifications={true} showCart={true} logoType={2} />

         <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
            {/* Card Principal de Perfil */}
            <View className="bg-movapp-card rounded-3xl p-3 mb-2 border border-movapp-borderCard border-opacity-50">
               {/* Información Personal */}
               <View className="bg-movapp-card rounded-2xl p-2">
                  <Text className="text-white text-base font-bold mb-1">Información Personal</Text>

                  {/* Nombre */}
                  <View className="flex-row items-center mb-2">
                     <Feather name="user" size={16} color={Colors.movapp.primary} />
                     <View className="ml-3 flex-1">
                        <Text className="text-gray-400 text-xs mb-0.5">Nombre</Text>
                        <Text className="text-white text-sm font-medium">{userData?.nombre ?? "-"}</Text>
                     </View>
                  </View>

                  {/* Teléfono */}
                  <View className="flex-row items-center mb-2">
                     <Feather name="phone" size={16} color={Colors.movapp.primary} />
                     <View className="ml-3 flex-1">
                        <Text className="text-gray-400 text-xs mb-0.5">Teléfono</Text>
                        <Text className="text-white text-sm font-medium">{userData?.telefono ?? "-"}</Text>
                     </View>
                  </View>

                  {/* Correo */}
                  <View className="flex-row items-center mb-2">
                     <Feather name="mail" size={16} color={Colors.movapp.primary} />
                     <View className="ml-3 flex-1">
                        <Text className="text-gray-400 text-xs mb-0.5">Correo electrónico</Text>
                        <Text className="text-white text-sm font-medium">{userData?.email ?? "-"}</Text>
                     </View>
                  </View>

                  {/* País */}
                  <View className="flex-row items-center">
                     <Feather name="flag" size={16} color={Colors.movapp.primary} />
                     <View className="ml-3 flex-1 flex-row items-center">
                        <Text style={{ fontSize: 20, marginRight: 8 }}>{getFlag(countryCode)}</Text>
                        <Text style={{ fontSize: 16, color: "#fff" }}>
                           {country === "Cargando..." ? "Cargando..." : `- ${country}`}
                        </Text>
                     </View>
                  </View>

                  {/* ✅ Debug info en modo desarrollo */}
                  {/* {__DEV__ && (
                     <View className="mt-3 p-2 bg-gray-800 rounded">
                        <Text className="text-yellow-400 text-xs mb-1">
                           DEBUG - Usuario pais_id: {userData?.pais_id || "null"}
                        </Text>
                        <Text className="text-yellow-400 text-xs mb-1">Total países: {paises?.length || 0}</Text>
                        <Text className="text-yellow-400 text-xs mb-1">
                           País encontrado: {selectedCountry ? "SÍ" : "NO"}
                        </Text>
                        {selectedCountry && (
                           <Text className="text-green-400 text-xs">País: {JSON.stringify(selectedCountry)}</Text>
                        )}
                     </View>
                  )} */}
               </View>
            </View>

            {/* Historial de Compras */}
            {purchases.length > 0 && (
               <View
                  className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50"
                  style={{ height: 260 }}
               >
                  <Text className="text-white text-base font-bold mb-2">Historial de Compras</Text>
                  <ScrollView
                     showsVerticalScrollIndicator={false}
                     style={{ flex: 1 }}
                     contentContainerStyle={{ paddingBottom: 2 }}
                  >
                     {purchases.map((purchase, index) => (
                        <TouchableOpacity
                           key={purchase.id}
                           className={`flex-row items-center ${index < purchases.length - 1 ? "mb-3" : ""}`}
                           activeOpacity={0.7}
                        >
                           <View
                              className="w-14 h-14 rounded-2xl items-center justify-center mr-3"
                              style={{ backgroundColor: purchase.bgColor }}
                           >
                              <Image source={getImage(purchase.img)} className="w-12 h-12" />
                           </View>
                           <View className="flex-1">
                              <Text className="text-white text-sm font-semibold mb-1" numberOfLines={1}>
                                 {purchase.title}
                              </Text>
                              <Text className="text-gray-400 text-xs">{purchase.date}</Text>
                           </View>
                           <Text className="text-purple-400 text-base font-bold ml-2">{purchase.price}</Text>
                        </TouchableOpacity>
                     ))}
                  </ScrollView>
               </View>
            )}

            {/* Configuración */}
            <View className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50">
               <Text className="text-white text-base font-bold mb-2">Configuración</Text>

               <TouchableOpacity className="flex-row items-center justify-between py-3.5">
                  <View className="flex-row items-center flex-1">
                     <Feather name="bell" size={20} color={Colors.movapp.primary} />
                     <Text className="text-white text-sm font-medium ml-3">Preferencias de Notificación</Text>
                  </View>
                  <View className="flex-row items-center">
                     <Text className="text-gray-400 text-xs mr-2">Activadas</Text>
                     <Feather name="chevron-right" size={18} color={Colors.movapp.backgroundTop} />
                  </View>
               </TouchableOpacity>
            </View>

            {/* Botón Cerrar Sesión */}
            <TouchableOpacity
               className="bg-red-700/70 py-4 rounded-xl items-center mb-6"
               activeOpacity={0.8}
               onPress={handleLogout}
            >
               <Text className="text-white text-lg font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
}
