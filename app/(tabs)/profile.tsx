// app/(tabs)/profile.tsx
import AuthService from "@/api/AuthService";
import NotificationService from "@/api/NotificationService";
import OrderService, { OrderItem } from "@/api/OrderService";
import AlertComponent from "@/components/Alert";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { useLogOut } from "@/hooks/useLogOut";
import { getFlag } from "@/utils/Flags";
import { getImage } from "@/utils/Images";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

// Función para obtener el deviceId desde SecureStore
const getDeviceId = async (): Promise<string> => {
   let deviceId = await SecureStore.getItemAsync("deviceId");
   return deviceId || "";
};

export default function ProfileScreen() {
   const [alert, setAlert] = useState<{
      type: "success" | "error" | "warning" | "info";
      title: string;
      message: string;
      onlyAccept?: boolean;
      onAccept?: () => void;
      onCancel?: () => void;
      acceptText?: string;
      cancelText?: string;
   } | null>(null);
   const router = useRouter();
   const { user, config } = useApp();
   const { logout } = useLogOut();

   const isLoggedIn = user.logged;
   const userData = user.infoUser;
   const paises = config.paises;

   // Estados para las órdenes
   const [purchases, setPurchases] = useState<OrderItem[]>([]);
   const [loadingOrders, setLoadingOrders] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Estados para las notificaciones
   const [notifEnabled, setNotifEnabled] = useState<boolean>(true);
   const [notifLoading, setNotifLoading] = useState<boolean>(false);
   const [deviceId, setDeviceId] = useState<string>("");
   const [deletingAccount, setDeletingAccount] = useState(false);

   // Obtener deviceId y pushToken al montar el componente
   useEffect(() => {
      (async () => {
         const id = await getDeviceId();
         setDeviceId(id);
      })();
   }, []);

   // Consultar estado de notificaciones cada vez que la pantalla obtiene el foco
   useFocusEffect(
      useCallback(() => {
         if (!deviceId) {
            console.warn("[Notificaciones] deviceId vacío, no se consulta el estado.");
            return;
         }
         setNotifLoading(true);
         NotificationService.getDevice(deviceId)
            .then((res) => {
               console.log("-----------------");

               console.log("\x1b[32m", "[Notificaciones] Respuesta getDevice:", res);
               if (res && res.success && res.device) {
                  setNotifEnabled(!!res.device.pushEnabled);
                  console.log("\x1b[33m", "[Notificaciones] Estado pushEnabled:", res.device.pushEnabled);
               } else {
                  setNotifEnabled(false);
                  console.warn("\x1b[31m", "[Notificaciones] No se encontró el dispositivo o pushEnabled.");
               }
            })
            .catch((err) => {
               setNotifEnabled(false);
               console.log("-----------------");
               console.log("\x1b[31m", "[Notificaciones] Error al obtener estado del dispositivo:", err);
            })
            .finally(() => setNotifLoading(false));
      }, [deviceId]),
   );

   // Función para cargar órdenes
   const fetchOrders = useCallback(async () => {
      if (!isLoggedIn || !userData?.user_uuid) {
         setLoadingOrders(false);
         return;
      }

      try {
         setLoadingOrders(true);
         setError(null);

         // console.log("📦 [Profile] Cargando órdenes para:", userData.user_uuid);
         const response = await OrderService.getPaidOrders(userData.user_uuid);
         // console.log("\x1b[35m", "getPaidOrders =>", response);
         if (response.success && response.orders && response.orders.length > 0) {
            setPurchases(response.orders);
         } else {
            console.log("⚠️ [Profile] No se pudieron cargar las órdenes");
            setPurchases([]);
         }
      } catch (err) {
         console.log("❌ [Profile] Error al cargar órdenes:", err);
         setError(err instanceof Error ? err.message : "Error desconocido");
         setPurchases([]);
      } finally {
         setLoadingOrders(false);
      }
   }, [isLoggedIn, userData?.user_uuid]);

   // Recargar órdenes cada vez que la pantalla obtiene el foco
   useFocusEffect(
      useCallback(() => {
         // console.log("🔄 [Profile] Pantalla en foco - Recargando órdenes");
         fetchOrders();
      }, [fetchOrders]),
   );

   const handleLogout = async () => {
      setAlert({
         type: "warning",
         title: "Cerrar Sesión",
         message: "¿Estás seguro que deseas cerrar sesión?",
         onlyAccept: false,
         acceptText: "Cerrar Sesión",
         cancelText: "Cancelar",
         onAccept: async () => {
            setAlert(null);
            try {
               await logout();
               setAlert({
                  type: "success",
                  title: "Sesión cerrada",
                  message: "Has cerrado tu sesión correctamente.",
                  onlyAccept: true,
                  onAccept: () => {
                     setAlert(null);
                     router.replace("/(auth)/login");
                  },
               });
            } catch (error) {
               setAlert({
                  type: "error",
                  title: "Error",
                  message: "No se pudo cerrar la sesión",
                  onlyAccept: true,
                  onAccept: () => setAlert(null),
               });
            }
         },
         onCancel: () => setAlert(null),
      });
   };

   // Handler para activar/desactivar notificaciones
   const handleToggleNotif = async (value: boolean) => {
      if (!deviceId) {
         setAlert({
            type: "error",
            title: "Error",
            message: "No se encontró el ID del dispositivo.",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
         return;
      }
      setNotifLoading(true);
      console.log("[Notificaciones] Cambiando pushEnabled a:", value);
      try {
         const res = await NotificationService.toggle(deviceId, value);
         console.log("[Notificaciones] Respuesta toggle:", res);
         if (res && res.success && res.device) {
            setNotifEnabled(!!res.device.pushEnabled);
            console.log("[Notificaciones] Nuevo estado pushEnabled:", res.device.pushEnabled);
         } else {
            setAlert({
               type: "error",
               title: "Error",
               message: res?.message || "No se pudo actualizar el estado de notificaciones",
               onlyAccept: true,
               onAccept: () => setAlert(null),
            });
         }
      } catch (err) {
         console.log("[Notificaciones] Error al cambiar estado:", err);
         setAlert({
            type: "error",
            title: "Error",
            message: "No se pudo actualizar el estado de notificaciones",
            onlyAccept: true,
            onAccept: () => setAlert(null),
         });
      } finally {
         setNotifLoading(false);
      }
   };

   // Handler para borrar cuenta
   const handleDeleteAccount = async () => {
      setAlert({
         type: "warning",
         title: "Borrar cuenta",
         message: "¿Estás seguro que deseas borrar tu cuenta? Esta acción no se puede deshacer.",
         onlyAccept: false,
         acceptText: "Borrar cuenta",
         cancelText: "Cancelar",
         onAccept: async () => {
            setAlert(null);
            setDeletingAccount(true);
            try {
               const res = await AuthService.deleteAccount();
               if (res.success) {
                  setAlert({
                     type: "success",
                     title: "Cuenta eliminada",
                     message: res.message || "Tu cuenta ha sido eliminada.",
                     onlyAccept: true,
                     onAccept: async () => {
                        setAlert(null);
                        await logout();
                     },
                  });
               } else {
                  setAlert({
                     type: "error",
                     title: "Error",
                     message: res.message || "No se pudo eliminar la cuenta.",
                     onlyAccept: true,
                     onAccept: () => setAlert(null),
                  });
               }
            } catch (err: any) {
               if (err?.response?.status === 401) {
                  setAlert({
                     type: "error",
                     title: "No autorizado",
                     message: "Tu sesión ha expirado. Por favor, inicia sesión de nuevo.",
                     onlyAccept: true,
                     onAccept: async () => {
                        setAlert(null);
                        await logout();
                     },
                  });
               } else {
                  setAlert({
                     type: "error",
                     title: "Error",
                     message: "No se pudo eliminar la cuenta.",
                     onlyAccept: true,
                     onAccept: () => setAlert(null),
                  });
               }
            } finally {
               setDeletingAccount(false);
            }
         },
         onCancel: () => setAlert(null),
      });
   };

   const selectedCountry = paises.find((p) => p.id === userData?.pais_id);
   const countryCode = selectedCountry?.codigo_pais || "MX";
   const country = selectedCountry?.nombre || selectedCountry?.pais || "Cargando...";

   return (
      <View className="flex-1 bg-black">
         <Header showNotifications={true} showCart={true} logoType={2} />
         {alert && (
            <AlertComponent
               visible={!!alert}
               type={alert.type}
               title={alert.title}
               message={alert.message}
               onlyAccept={alert.onlyAccept}
               onAccept={alert.onAccept}
               onCancel={alert.onCancel}
               acceptText={alert.acceptText}
               cancelText={alert.cancelText}
            />
         )}
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
               </View>
            </View>

            {/* Historial de Compras */}
            {loadingOrders ? (
               <View className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50">
                  <Text className="text-white text-base font-bold mb-3">Historial de Compras</Text>
                  <View style={{ height: 300 }} className="items-center justify-center">
                     <ActivityIndicator size="large" color={Colors.movapp.primary} />
                     <Text className="text-gray-400 text-sm mt-3">Cargando compras...</Text>
                  </View>
               </View>
            ) : error ? (
               <View className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50">
                  <Text className="text-white text-base font-bold mb-3">Historial de Compras</Text>
                  <AlertComponent visible={true} type="error" title="Error al cargar las compras" message={error} />
               </View>
            ) : purchases.length > 0 ? (
               <View className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50">
                  <Text className="text-white text-base font-bold mb-3">Historial de Compras</Text>
                  <ScrollView showsVerticalScrollIndicator={true} style={{ maxHeight: 190 }} nestedScrollEnabled={true}>
                     {purchases.map((purchase, index) => (
                        <View
                           key={purchase.id}
                           className={`flex-row items-center py-3 ${
                              index < purchases.length - 1 ? "border-b border-gray-700/50" : ""
                           }`}
                        >
                           <View className="w-16 h-16 rounded-2xl items-center justify-center mr-3 ">
                              {purchase.sku ? (
                                 <Image
                                    source={getImage(purchase.sku)}
                                    className="w-14 h-14 rounded-xl"
                                    resizeMode="cover"
                                 />
                              ) : (
                                 <Feather name="shopping-bag" size={28} color={Colors.movapp.primary} />
                              )}
                           </View>
                           <View className="flex-1">
                              <Text className="text-white text-base font-semibold mb-1" numberOfLines={2}>
                                 {purchase.descripcion}
                              </Text>
                              <Text className="text-gray-400 text-xs">
                                 {new Date(purchase.created_at).toLocaleDateString("es-MX", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                 })}
                              </Text>
                           </View>
                           <View className="items-end">
                              <Text className="text-purple-400 text-lg font-bold">${purchase.subtotal}</Text>
                              <Text className="text-gray-500 text-xs">x{purchase.cantidad}</Text>
                           </View>
                        </View>
                     ))}
                  </ScrollView>
               </View>
            ) : null}

            {/* Configuración */}
            <View className="bg-movapp-card rounded-3xl p-6 mb-2 border border-movapp-borderCard border-opacity-50">
               <Text className="text-white text-base font-bold mb-2">Configuración</Text>

               <View className="flex-row items-center justify-between py-3.5">
                  <View className="flex-row items-center flex-1">
                     <Feather name="bell" size={20} color={Colors.movapp.primary} />
                     <Text className="text-white text-sm font-medium ml-3">Recibe notificaciones</Text>
                  </View>
                  <View>
                     <Switch
                        value={notifEnabled}
                        onValueChange={handleToggleNotif}
                        // disabled={notifLoading || !pushToken}
                        thumbColor={notifEnabled ? Colors.movapp.green : Colors.movapp.red}
                        trackColor={{ false: "#444", true: Colors.movapp.primary }}
                     />
                  </View>
               </View>
            </View>

            {/* Botón Cerrar Sesión */}
            <TouchableOpacity
               className="bg-movapp-logoutButton py-4 rounded-xl items-center mb-3"
               activeOpacity={0.8}
               onPress={handleLogout}
            >
               <Text className="text-white text-lg font-bold">Cerrar Sesión</Text>
            </TouchableOpacity>

            {/* Botón Cerrar Sesión */}
            <TouchableOpacity
               className="bg-movapp-text py-4 rounded-xl items-center mb-2"
               activeOpacity={0.8}
               onPress={handleDeleteAccount}
               disabled={deletingAccount}
            >
               <Text className="text-movapp-primary text-lg font-bold">
                  {deletingAccount ? "Eliminando cuenta..." : "Eliminar cuenta"}
               </Text>
            </TouchableOpacity>
         </ScrollView>
      </View>
   );
}
