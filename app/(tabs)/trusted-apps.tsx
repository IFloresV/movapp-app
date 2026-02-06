// app/(tabs)/trusted-apps.tsx
import React, { useState } from "react";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Text, TouchableOpacity, View } from "react-native";

interface LoanApp {
   name: string;
   description: string;
   requirements: string[];
   amount: string;
   rate: string;
   term: string;
   url: string;
   country: "MX" | "CO";
}

const loanApps: LoanApp[] = [
   {
      name: "Abea",
      description:
         "ABEA es una empresa mexicana que ofrece préstamos personales pequeños y digitales, de aprobación rápida y sin trámites presenciales; no es un banco, sino un prestamista privado que otorga créditos a corto plazo con pagos programados y tasas de interés según el perfil del usuario.",
      requirements: ["Mayor de edad", "Nacionalidad mexicana", "INE o pasaporte", "Teléfono", "Correo electrónico"],
      amount: "Hasta $24,000 MXN",
      rate: "Desde 17% mensual",
      term: "Hasta 180 días",
      url: "https://track.crezu.net/click?pid=7944&offer_id=258",
      country: "MX",
   },
   {
      name: "Clicredito",
      description:
         "Clicrédito es un prestamista digital en México que otorga préstamos pequeños y a corto plazo, con trámite rápido y en línea; no es un banco y sus créditos suelen tener costos altos, por lo que se usa principalmente para emergencias.",
      requirements: [
         "Mayor de 18 años",
         "Identificación oficial vigente",
         "Selfie a color",
         "Número celular",
         "Cuenta bancaria",
         "Correo electrónico",
      ],
      amount: "Hasta $8,000 MXN",
      rate: "Desde 1.1% diario",
      term: "Hasta 30 días",
      url: "https://track.crezu.net/click?pid=7944&offer_id=855",
      country: "MX",
   },
   {
      name: "Dineria",
      description:
         "Dineria es una plataforma de préstamos personales en línea en México que ofrece créditos rápidos con trámite digital, sin aval y con aprobación en poco tiempo; no es un banco, sino una empresa prestamista que otorga dinero a particulares para cubrir necesidades financieras urgentes o imprevistos.",
      requirements: [
         "Entre 21 y 70 años",
         "Identificación oficial vigente y selfie",
         "Cuenta bancaria a tu nombre",
         "Comprobante de ingresos",
      ],
      amount: "Hasta $35,000 MXN",
      rate: "Desde 0.49% diario",
      term: "Días, meses o años",
      url: "https://track.leadsmatcher.com/click?pid=7944&offer_id=34",
      country: "MX",
   },
   {
      name: "Vivus",
      description:
         "Vivus es una plataforma de préstamos personales en línea en México que ofrece créditos rápidos y sin papeleo, con proceso 100% digital y respuesta en minutos; no es un banco, sino una empresa financiera que presta dinero a corto plazo para emergencias o necesidades urgentes.",
      requirements: [
         "Mayor de 18 años",
         "Identificación oficial vigente",
         "Cuenta bancaria a tu nombre",
         "Teléfono",
         "Correo electrónico",
      ],
      amount: "Hasta $12,000 MXN",
      rate: "Desde 511% anual",
      term: "Hasta 30 días",
      url: "https://track.leadsmatcher.com/click?pid=7944&offer_id=52",
      country: "MX",
   },
   {
      name: "RayoCredit",
      description:
         "RayoCredit (Rayo México) es una empresa de préstamos personales en línea en México que ofrece microcréditos rápidos y 100% digitales pensados para cubrir necesidades urgentes o emergencias económicas; no es un banco, sino una entidad financiera no tradicional que da dinero sin tantos requisitos y con aprobación en poco tiempo.",
      requirements: [
         "Mayor de edad",
         "Identificación oficial vigente",
         "Cuenta bancaria mexicana",
         "Teléfono y datos personales",
      ],
      amount: "Hasta $15,000 MXN",
      rate: "Desde 585% anual",
      term: "Hasta 12 meses",
      url: "https://track.leadsmatcher.com/click?pid=7944&offer_id=680",
      country: "MX",
   },
   {
      name: "Lanu",
      description:
         "Lanu es una plataforma de préstamos personales 100% digitales en México operada por SOFI DIGITAL MX S.A. de C.V., que ofrece microcréditos o líneas de crédito revolventes sin aval y con proceso en línea para obtener dinero rápido; no es un banco, sino un prestamista digital que revisa tu historial y te otorga crédito según tu perfil.",
      requirements: [
         "Mayor de edad",
         "Identificación oficial vigente",
         "Cuenta bancaria mexicana",
         "En algunos casos piden buró de crédito",
      ],
      amount: "Hasta $35,000 MXN",
      rate: "Desde 1.41% diario",
      term: "Hasta 30 días",
      url: "https://track.leadsmatcher.com/click?pid=7944&offer_id=959",
      country: "MX",
   },
   {
      name: "Doctor Peso",
      description:
         "Doctor Peso es una plataforma de préstamos personales en línea, diseñada para ofrecer créditos rápidos y 100% digitales, con aprobación en minutos y desembolso directo a tu cuenta bancaria. La mayoría de sus ofertas están pensadas para residentes de Colombia y se enfocan en necesidades urgentes de liquidez sin papeleo pesado.",
      requirements: [
         "Entre 21 y 70 años",
         "Cédula de identidad",
         "Cuenta bancaria propia",
         "Teléfono celular",
         "Correo electrónico",
      ],
      amount: "Hasta $1,200,000 COP",
      rate: "Desde 1.81% diario",
      term: "Hasta 30 días",
      url: "https://track.leadsmatcher.com/click?pid=7944&offer_id=487",
      country: "CO",
   },
   {
      name: "Wasticredit",
      description:
         "Wasticredit es una plataforma de microcréditos en línea que opera en Colombia ofreciendo préstamos personales rápidos y 100% digitales sin papeleo ni intermediarios tradicionales; su objetivo es facilitar acceso a crédito para personas con requisitos mínimos y aprobación ágil.",
      requirements: [
         "Mayor de 18 años",
         "Cédula de ciudadanía colombiana",
         "Cuenta bancaria",
         "Teléfono",
         "Correo electrónico",
      ],
      amount: "Hasta $3,000,000 COP",
      rate: "Desde 23.15% anual",
      term: "Hasta 30 días",
      url: "https://track.crezu.net/click?pid=7944&offer_id=313",
      country: "CO",
   },
   {
      name: "RayoCredit Colombia",
      description:
         "RayoCredit es una plataforma de préstamos personales en línea en Colombia que ofrece microcréditos rápidos y 100% digitales, pensados para cubrir necesidades urgentes de dinero, incluso si tienes historial limitado o estás reportado en centrales de riesgo; no es un banco, sino una entidad financiera regulada que evalúa tu capacidad de pago para otorgar el préstamo sin filas ni papeleo físico.",
      requirements: [
         "Mayor de 18 años",
         "Identificación oficial vigente",
         "Cuenta bancaria",
         "Teléfono y datos personales",
      ],
      amount: "Hasta $1,000,000 COP",
      rate: "Desde 24.78% anual",
      term: "Hasta 45 días",
      url: "https://track.crezu.net/click?pid=7944&offer_id=411",
      country: "CO",
   },
];

export default function TrustedAppsScreen() {
   const [expandedApp, setExpandedApp] = useState<string | null>(null);
   const [selectedCountry, setSelectedCountry] = useState<"MX" | "CO" | "ALL">("ALL");

   const filteredApps =
      selectedCountry === "ALL" ? loanApps : loanApps.filter((app) => app.country === selectedCountry);

   const toggleExpand = (appName: string) => {
      setExpandedApp(expandedApp === appName ? null : appName);
   };

   const openUrl = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
         await Linking.openURL(url);
      }
   };

   return (
      <LayoutWithNavigation scrollable={true}>
         {/* Header */}
         <View className="px-4 mt-4 mb-5">
            <View className="bg-movapp-linkBackgroundHome rounded-2xl p-5">
               <Text className="text-white text-2xl font-bold mb-2 text-center">
                  Aplicaciones de Préstamos Confiables
               </Text>
               <Text className="text-gray-300 text-sm mb-4">
                  Solicitar un préstamo no debería ponerte en riesgo. Esta página existe porque ayudamos a personas que
                  fueron víctimas de aplicaciones de préstamos abusivas y conocemos cómo operan.
               </Text>
            </View>
         </View>

         {/* What is "Reliable"? */}
         <View className="px-4 mb-4">
            <View className="bg-movapp-linkBackgroundHome rounded-2xl p-5">
               <View className="flex-row items-center mb-3">
                  <MaterialCommunityIcons name="shield-check" size={28} color="#a855f7" />
                  <Text className="text-white text-lg font-bold ml-3">¿Qué entendemos por "Confiables"?</Text>
               </View>
               <Text className="text-gray-300 text-sm mb-3">Llamamos confiables a plataformas que:</Text>
               <View className="space-y-2">
                  <View className="flex-row items-start">
                     <Text className="text-movapp-primary mr-2">•</Text>
                     <Text className="text-gray-300 text-sm flex-1">Operan bajo un marco legal identificable</Text>
                  </View>
                  <View className="flex-row items-start">
                     <Text className="text-movapp-primary mr-2">•</Text>
                     <Text className="text-gray-300 text-sm flex-1">
                        Informan costos, plazos y condiciones con claridad
                     </Text>
                  </View>
                  <View className="flex-row items-start">
                     <Text className="text-movapp-primary mr-2">•</Text>
                     <Text className="text-gray-300 text-sm flex-1">No realizan cobranza intimidatoria</Text>
                  </View>
                  <View className="flex-row items-start">
                     <Text className="text-movapp-primary mr-2">•</Text>
                     <Text className="text-gray-300 text-sm flex-1">
                        No acceden de forma abusiva a contactos o archivos personales
                     </Text>
                  </View>
               </View>
               <Text className="text-gray-400 text-xs mt-3 italic">
                  Esto no es una garantía absoluta, sino un filtro para reducir riesgos reales.
               </Text>
            </View>
         </View>

         {/* Country Filter */}
         <View className="px-4 mb-4">
            <View className="flex-row gap-2">
               <TouchableOpacity
                  onPress={() => setSelectedCountry("ALL")}
                  className={`flex-1 py-3 rounded-xl ${selectedCountry === "ALL" ? "bg-movapp-primary" : "bg-movapp-linkBackgroundHome"}`}
               >
                  <Text
                     className={`text-center font-bold ${selectedCountry === "ALL" ? "text-white" : "text-gray-400"}`}
                  >
                     Todas
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => setSelectedCountry("MX")}
                  className={`flex-1 py-3 rounded-xl ${selectedCountry === "MX" ? "bg-movapp-primary" : "bg-movapp-linkBackgroundHome"}`}
               >
                  <Text
                     className={`text-center font-bold ${selectedCountry === "MX" ? "text-white" : "text-gray-400"}`}
                  >
                     🇲🇽 México
                  </Text>
               </TouchableOpacity>
               <TouchableOpacity
                  onPress={() => setSelectedCountry("CO")}
                  className={`flex-1 py-3 rounded-xl ${selectedCountry === "CO" ? "bg-movapp-primary" : "bg-movapp-linkBackgroundHome"}`}
               >
                  <Text
                     className={`text-center font-bold ${selectedCountry === "CO" ? "text-white" : "text-gray-400"}`}
                  >
                     🇨🇴 Colombia
                  </Text>
               </TouchableOpacity>
            </View>
         </View>

         {/* Loan Apps List */}
         <View className="px-4 pb-6">
            {filteredApps.map((app) => (
               <View key={app.name} className="bg-movapp-linkBackgroundHome rounded-2xl p-5 mb-4">
                  <TouchableOpacity onPress={() => toggleExpand(app.name)}>
                     <View className="flex-row items-center justify-between mb-3">
                        <View className="flex-row items-center flex-1">
                           <View className="bg-movapp-primary/20 p-3 rounded-xl mr-3">
                              <MaterialCommunityIcons name="cash-multiple" size={24} color="#a855f7" />
                           </View>
                           <View className="flex-1">
                              <Text className="text-white text-lg font-bold">{app.name}</Text>
                              <Text className="text-gray-400 text-xs">
                                 {app.country === "MX" ? "🇲🇽 México" : "🇨🇴 Colombia"}
                              </Text>
                           </View>
                        </View>
                        <Ionicons
                           name={expandedApp === app.name ? "chevron-up" : "chevron-down"}
                           size={24}
                           color="#a855f7"
                        />
                     </View>
                  </TouchableOpacity>

                  {expandedApp === app.name && (
                     <View>
                        <Text className="text-gray-300 text-sm mb-4">{app.description}</Text>

                        <View className="border-t border-gray-700 pt-4 mb-4">
                           <Text className="text-white font-bold mb-2">📋 Requisitos</Text>
                           {app.requirements.map((req, index) => (
                              <View key={index} className="flex-row items-start mb-1">
                                 <Text className="text-movapp-primary mr-2">•</Text>
                                 <Text className="text-gray-300 text-sm flex-1">{req}</Text>
                              </View>
                           ))}
                        </View>

                        <View className="flex-row justify-between mb-4">
                           <View className="flex-1 mr-2">
                              <Text className="text-gray-400 text-xs mb-1">💰 Monto</Text>
                              <Text className="text-white text-sm font-bold">{app.amount}</Text>
                           </View>
                           <View className="flex-1 mx-1">
                              <Text className="text-gray-400 text-xs mb-1">📊 Tasa</Text>
                              <Text className="text-white text-sm font-bold">{app.rate}</Text>
                           </View>
                           <View className="flex-1 ml-2">
                              <Text className="text-gray-400 text-xs mb-1">⏱️ Plazo</Text>
                              <Text className="text-white text-sm font-bold">{app.term}</Text>
                           </View>
                        </View>

                        <TouchableOpacity
                           onPress={() => openUrl(app.url)}
                           className="bg-movapp-primary py-3 rounded-xl flex-row items-center justify-center"
                        >
                           <Text className="text-white font-bold mr-2">IR AL SITIO WEB</Text>
                           <Feather name="external-link" size={16} color="white" />
                        </TouchableOpacity>
                     </View>
                  )}
               </View>
            ))}
         </View>

         {/* Disclaimer */}
         <View className="px-4 pb-6">
            <View className="bg-yellow-900/30 border border-yellow-600/50 rounded-2xl p-5">
               <View className="flex-row items-center mb-3">
                  <Feather name="alert-triangle" size={24} color="#fbbf24" />
                  <Text className="text-yellow-400 text-lg font-bold ml-3">Descargo de responsabilidad</Text>
               </View>
               <Text className="text-gray-300 text-sm mb-3 font-bold">Aviso Importante</Text>
               <Text className="text-gray-300 text-sm mb-4">
                  No somos una institución financiera ni otorgamos préstamos. La información es únicamente informativa y
                  puede cambiar sin previo aviso. La contratación de cualquier préstamo es responsabilidad del usuario,
                  quien debe leer y aceptar los términos de cada plataforma.
               </Text>
               <Text className="text-gray-300 text-sm mb-3 font-bold">Sobre Nuestros Ingresos</Text>
               <Text className="text-gray-300 text-sm mb-4">
                  Algunos enlaces pueden generar una comisión para nosotros sin costo adicional para el usuario. Esto no
                  influye en nuestras evaluaciones.
               </Text>
               <Text className="text-red-400 text-sm font-bold">
                  ⚠️ Estas apps las puedes utilizar para un imprevisto, tienen intereses altos y sí tienen área de
                  cobranza. Úsalas solo en caso de emergencia.
               </Text>
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
