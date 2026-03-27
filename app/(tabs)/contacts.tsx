// app/(tabs)/contacts.tsx
import React, { useState } from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Info } from "@/constants/Info";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Linking, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Contact {
   name: string;
   phone: string;
}

const contacts: Contact[] = [
   { name: "Andres", phone: "5578352908" },
   { name: "Dany", phone: "5633105577" },
   { name: "Jadiel", phone: "5537100816" },
   { name: "Julio", phone: "5560361036" },
   { name: "Leonardo", phone: "5563220132" },
   { name: "Max", phone: "5561060884" },
   { name: "Rosaura", phone: "7228017902" },
   { name: "Zoe", phone: "5657175282" },
   { name: "Moni", phone: "7294509488" },
   { name: "Diego", phone: "5635166009" },
   { name: "Sol", phone: "7261854700" },

   { name: "Movapp Principal", phone: "5574360621" },
   // Hackers
   { name: "Dante", phone: "99299797" },
   { name: "Delhi", phone: "5514856625" },
   { name: "Rodo", phone: "913744119" },
   { name: "Nat", phone: "5655894519" },
   { name: "Isabel", phone: "7298056828" },
   { name: "Gilberto", phone: "5513760371" },
   { name: "George", phone: "5541342522" },
   { name: "Arturo", phone: "5519188741" },
   { name: "Jakelin", phone: "5521958762" },
];

const contactsFalse: Contact[] = [{ name: "Peru", phone: "952401035" }];

export default function ContactsScreen() {
   const [searchText, setSearchText] = useState("");

   const handleSearchChange = (text: string) => {
      // Solo permite números
      const numericText = text.replace(/[^0-9]/g, "");
      setSearchText(numericText);
   };

   const openWhatsApp = async (phone: string, name: string) => {
      const cleanNumber = phone.replace(/\D/g, "");
      const message = `Hola ${name}, me gustaría solicitar asesoría`;
      const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

      try {
         await Linking.openURL(whatsappUrl);
      } catch (error) {
         console.log("Error opening WhatsApp:", error);
      }
   };

   const isValidLength = searchText.length >= 9 && searchText.length <= 12;

   const filteredContacts = isValidLength ? contacts.filter((contact) => contact.phone === searchText) : [];

   const isFalseContact = isValidLength ? contactsFalse.some((contact) => contact.phone === searchText) : false;

   return (
      <LayoutWithNavigation scrollable={true}>
         {/* Header */}
         <View className="px-4 mt-4 mb-5">
            <View className="bg-movapp-linkBackgroundHome rounded-2xl p-5">
               <Text className="text-white text-xl font-bold mb-2 text-center">Confirma el número de tu asesor</Text>
            </View>
         </View>

         {/* Search Bar */}
         <View className="px-4 mb-4">
            <View className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center">
               <FontAwesome name="search" size={22} color="#9CA3AF" style={{ marginRight: 12 }} />
               <TextInput
                  className="flex-1 text-white text-md py-2"
                  placeholder="Ingresa el número sin código de país"
                  placeholderTextColor="#9CA3AF"
                  value={searchText}
                  onChangeText={handleSearchChange}
                  keyboardType="phone-pad"
                  maxLength={12}
               />
               {searchText.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchText("")}>
                     <FontAwesome name="times-circle" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
               )}
            </View>
         </View>

         {/* Contacts List */}
         <View className="px-4 pb-6">
            {isValidLength && isFalseContact ? (
               <>
                  <View className="bg-red-900/40 border border-red-600/60 rounded-2xl p-5 mb-4">
                     <View className="flex-row items-center mb-3">
                        <Feather name="alert-octagon" size={24} color="#f87171" />
                        <Text className="text-red-400 text-lg font-bold ml-3">Cuidado: contacto falso</Text>
                     </View>
                     <Text className="text-gray-200 text-lg font-bold">
                        Este número ha sido identificado como falso. No compartas información personal ni realices pagos
                        con este contacto.
                     </Text>
                  </View>
                  <View className="bg-movapp-linkBackgroundHome rounded-2xl p-5">
                     <TouchableOpacity
                        className="bg-green-500/20 p-4 rounded-xl flex-row items-center justify-center"
                        onPress={() => openWhatsApp(Info.whatsappNumber, "MovApp")}
                        activeOpacity={0.7}>
                        <FontAwesome name="whatsapp" size={32} color="#25D366" style={{ marginRight: 12 }} />
                        <Text className="text-white text-2xl font-bold">{"Chat principal"}</Text>
                     </TouchableOpacity>
                     <Text className="text-white text-center mb-4 mt-4 text-lg">
                        Si tienes dudas, contacta a nuestro chat principal para verificar la información de tu asesor.
                     </Text>
                  </View>
               </>
            ) : isValidLength && filteredContacts.length === 0 ? (
               <>
                  <View className="bg-yellow-900/30 border border-yellow-600/50 rounded-2xl p-5 mb-4">
                     <View className="flex-row items-center mb-3">
                        <Feather name="alert-triangle" size={24} color="#fbbf24" />
                        <Text className="text-yellow-400 text-lg font-bold ml-3">Número no registrado</Text>
                     </View>
                     <Text className="text-gray-300 text-lg font-bold">
                        Este número de asesor no forma parte del equipo Movapp
                     </Text>
                  </View>
                  <View className="bg-movapp-linkBackgroundHome rounded-2xl p-5">
                     <TouchableOpacity
                        className="bg-green-500/20 p-4 rounded-xl flex-row items-center justify-center"
                        onPress={() => openWhatsApp(Info.whatsappNumber, "MovApp")}
                        activeOpacity={0.7}>
                        <FontAwesome name="whatsapp" size={32} color="#25D366" style={{ marginRight: 12 }} />
                        <Text className="text-white text-2xl font-bold">{"Chat principal"}</Text>
                     </TouchableOpacity>
                     <Text className="text-white text-center mb-4 mt-4 text-lg">
                        Puedes contactar a nuestro chat principal para recibir ayuda personalizada
                     </Text>
                  </View>
               </>
            ) : isValidLength && filteredContacts.length > 0 ? (
               filteredContacts.map((contact, index) => (
                  <TouchableOpacity
                     key={index}
                     className="bg-movapp-linkBackgroundHome rounded-2xl p-4 flex-row items-center mb-3"
                     onPress={() => openWhatsApp(contact.phone, contact.name)}
                     activeOpacity={0.7}>
                     <View className="bg-green-500/20 p-3 rounded-xl mr-6">
                        <FontAwesome name="whatsapp" size={24} color="#25D366" />
                     </View>
                     <View className="flex-1">
                        <Text className="text-white text-lg font-bold">{contact.name}</Text>
                        <Text className="text-white text-lg font-italic">{contact.phone}</Text>
                     </View>
                  </TouchableOpacity>
               ))
            ) : null}
         </View>
      </LayoutWithNavigation>
   );
}
