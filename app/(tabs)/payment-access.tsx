import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PaymentAccessScreen() {
   const router = useRouter();

   return (
      <LayoutWithNavigation scrollable={false}>
         <ScrollView className="px-4 py-2" showsVerticalScrollIndicator={false}>
            <View className="bg-movapp-linkBorder rounded-2xl px-3 mx-4 border border-movapp-borderCard">
               <Text className="text-white text-xl font-bold text-center mt-6 mb-3">Acceso requerido</Text>

               <Text className="text-gray-300 text-justify mb-6">
                  Para continuar con tu compra, necesitas iniciar sesión o crear una cuenta.
               </Text>
            </View>
            <View className=" p-4">
               <TouchableOpacity
                  className="bg-movapp-primary py-4 rounded-xl items-center mb-3"
                  onPress={() => router.push("/login")}
               >
                  <Text className="text-white font-bold text-lg">Iniciar sesión</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  className="bg-movapp-primary py-4 rounded-xl items-center mb-3"
                  onPress={() => router.push("/register")}
               >
                  <Text className="text-white font-bold text-lg">Crear cuenta</Text>
               </TouchableOpacity>

               <TouchableOpacity
                  className="border border-movapp-primary py-4 rounded-xl items-center mb-3"
                  onPress={() => router.push("/car")}
               >
                  <Text className="text-movapp-primary font-bold text-lg">Volver</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </LayoutWithNavigation>
   );
}
