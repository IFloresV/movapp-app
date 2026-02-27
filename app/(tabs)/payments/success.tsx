import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Colors } from "@/constants/Colors";
import { useApp } from "@/context/AppContext";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PaymentSuccessScreen() {
   const { user } = useApp();
   const userData = user.infoUser;
   const router = useRouter();

   return (
      <LayoutWithNavigation scrollable={false}>
         <View
            style={{
               flex: 1,
               padding: 24,
               justifyContent: "center",
               alignItems: "center",
            }}
         >
            <Text style={{ color: Colors.movapp.green, fontSize: 28, fontWeight: "800", marginBottom: 12 }}>
               Pago exitoso
            </Text>
            <Text style={{ color: "#cbd5e1", fontSize: 16, textAlign: "center", marginBottom: 24 }}>
               Gracias por tu compra. Tu pago fue procesado correctamente.
            </Text>

            <TouchableOpacity
               onPress={() => router.push("/hack")}
               style={{
                  backgroundColor: Colors.movapp.primary,
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 10,
               }}
            >
               <Text style={{ color: "#fff", fontWeight: "700" }}>Volver a la tienda</Text>
            </TouchableOpacity>
         </View>
      </LayoutWithNavigation>
   );
}
