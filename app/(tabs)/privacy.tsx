// app/(tabs)/privacy.tsx
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import React from "react";
import { Text, View } from "react-native";

const PRIVACY_SECTIONS = [
   {
      id: "priv-1",
      title: "1. Uso de la aplicación sin registro",
      content:
         "La App puede utilizarse sin necesidad de crear una cuenta para acceder al contenido informativo. El registro es opcional y únicamente necesario para acceder al carrito de compras y contratar los servicios de asesoría.",
   },
   {
      id: "priv-2",
      title: "2. Información que recopilamos",
      content:
         "Solo recopilamos información personal cuando el usuario decide registrarse voluntariamente para contratar un servicio. Los datos que podemos recopilar son: Nombre completo, Correo electrónico, Número de teléfono, País, Código postal. No solicitamos datos sensibles adicionales ni información innecesaria para la prestación del servicio.",
   },
   {
      id: "priv-3",
      title: "3. Finalidad del uso de los datos",
      content:
         "La información recopilada se utiliza exclusivamente para: Crear y administrar la cuenta del usuario, Gestionar el proceso de compra de servicios, Canalizar al usuario con un asesor vía WhatsApp, Contactar al usuario en relación con la asesoría contratada, Determinar la asignación del asesor según país y zona.",
   },
   {
      id: "priv-4",
      title: "4. Uso del número telefónico",
      content:
         "El número telefónico es requerido únicamente para: Establecer comunicación directa entre el usuario y el asesor asignado, Brindar el servicio de asesoría a través de WhatsApp. El número telefónico no se utiliza con fines publicitarios ni se comparte con terceros ajenos al servicio.",
   },
   {
      id: "priv-5",
      title: "5. Compartición de información",
      content:
         "No vendemos, alquilamos ni compartimos información personal con terceros, salvo cuando sea estrictamente necesario para: Procesar pagos, Prestar el servicio de asesoría solicitado. En dichos casos, la información compartida se limita al mínimo indispensable.",
   },
   {
      id: "priv-6",
      title: "6. Conservación de la información",
      content:
         "Los datos personales se conservan únicamente durante el tiempo necesario para cumplir con las finalidades descritas en esta política o mientras el usuario mantenga una cuenta activa.",
   },
   {
      id: "priv-7",
      title: "7. Eliminación de datos y derechos del usuario",
      content:
         "El usuario puede solicitar en cualquier momento: Acceso a sus datos, Corrección de su información, Eliminación de su cuenta y datos personales. Para ello, puede escribir a: privacidad@movapp.org",
   },
   {
      id: "priv-8",
      title: "8. Seguridad de la información",
      content:
         "Implementamos medidas técnicas y organizativas razonables para proteger la información personal contra accesos no autorizados, pérdida o uso indebido.",
   },
   {
      id: "priv-9",
      title: "9. Cambios a esta política",
      content:
         "La Empresa se reserva el derecho de modificar esta Política de Privacidad. Cualquier cambio será publicado en esta misma página y entrará en vigor a partir de su publicación.",
   },
   {
      id: "priv-10",
      title: "10. Contacto",
      content:
         "Si tienes dudas sobre esta Política de Privacidad o el tratamiento de tus datos, puedes contactarnos en: privacidad@movapp.org",
   },
];

export default function PrivacyScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="px-4 py-1">
            <View className="mb-6 flex-row items-center justify-center space-x-3">
               <Text className="text-white text-2xl font-bold mx-3 text-center">Política de Privacidad</Text>
            </View>

            <Text className="text-movapp-icon text-sm text-center mb-6">Última actualización: enero de 2026</Text>

            <Text className="text-white text-base leading-6 mb-8 px-2 text-center">
               Movapp (en adelante, "la App") es una aplicación propiedad de Movapp (la "Empresa"), diseñada para ofrecer
               contenido informativo y servicios de asesoría personalizada a través de WhatsApp.
            </Text>

            {PRIVACY_SECTIONS.map((section) => (
               <View key={section.id} className="mb-6 px-2">
                  <Text className="text-movapp-textSecondary text-lg font-bold mb-2">{section.title}</Text>
                  <Text className="text-white text-base leading-6">{section.content}</Text>
               </View>
            ))}

            <Text className="text-movapp-icon text-xs text-center mt-4 mb-10">
               © 2026 Movapp. Todos los derechos reservados.
            </Text>
         </View>
      </LayoutWithNavigation>
   );
}
