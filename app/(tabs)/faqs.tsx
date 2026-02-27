// app/(tabs)/faqs.tsx
import FAQItem from "@/components/FAQItem";
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { useApp } from "@/context/AppContext";
import React from "react";
import { Text, View } from "react-native";

const HACK_SECTION = [
   {
      id: "hack-what",
      title: "¿Qué es el Hack?",
      content:
         "El Hack es una herramienta tecnológica desarrollada para detener el acoso y la extorsión provenientes de aplicaciones de préstamos inmediatos. A través de Movapp, esta estrategia se implementa como alternativa ante amenazas, hostigamiento, intentos de intimidación y esquemas de pago abusivos derivados de este tipo de aplicaciones.",
   },
   {
      id: "hack-how-to-get",
      title: "¿Cómo puedo adquirir el Hack?",
      content:
         "Para adquirir El Hack es necesario establecer contacto con Movapp. Un asesor especializado evaluará el caso y brindará orientación inicial, explicando el proceso y las opciones disponibles para su implementación.",
   },
   {
      id: "hack-privacy",
      title: "¿Si adquiero el Hack mis datos son expuestos?",
      content:
         "Una vez que se adquiere El Hack o cualquier servicio de Movapp, la información compartida se utiliza exclusivamente para el proceso correspondiente. Movapp cuenta con aviso de privacidad enfocado en la protección de datos sensibles y resguarda la información bajo protocolos internos de confidencialidad.",
   },
   {
      id: "hack-validity",
      title: "¿Qué vigencia tiene el Hack?",
      content:
         "El Hack no tiene fecha de caducidad. Se implementa una sola vez y puede mantenerse vigente en el tiempo, siempre que se sigan las recomendaciones proporcionadas durante el acompañamiento.",
   },
];

const ALCANCES_SECTION = [
   {
      id: "alc-1",
      title: "¿Debo pagar a las aplicaciones montadeudas?",
      content:
         "Movapp se especializa en el análisis de aplicaciones montadeudas. En muchos casos, estos esquemas operan mediante préstamos anzuelo o estructuras ficticias diseñadas para generar pagos recurrentes bajo presión. Cada situación debe evaluarse antes de tomar una decisión.",
   },
   {
      id: "alc-2",
      title: "¿Van a mi casa los montadeudas para cobrarme si me atraso o no pago?",
      content:
         "Las investigaciones realizadas en torno a este fenómeno indican que el esquema de operación de las aplicaciones montadeudas es principalmente digital. Las amenazas de visitas domiciliarias suelen formar parte de la estrategia de intimidación. En la mayoría de los casos, no existe contacto físico con quien realiza el cobro.",
   },
   {
      id: "alc-3",
      title: "¿Cómo obtienen mis datos las aplicaciones montadeudas?",
      content:
         "Al descargar una aplicación montadeudas, el usuario suele otorgar permisos que permiten el acceso a galería de fotos, ubicación, lista de contactos y mensajes SMS. Este acceso facilita que la información sea utilizada posteriormente como mecanismo de presión. Algunas de estas aplicaciones operan mediante esquemas asociados a software conocido como “Spyloan”, utilizado para recopilar y almacenar datos personales.",
   },
   {
      id: "alc-4",
      title: "¿Las aplicaciones montadeudas me meten a buro de crédito?",
      content:
         "La mayoría de las aplicaciones montadeudas no cuentan con facultades para reportar directamente a Buró de Crédito. No obstante, existe un número reducido que opera bajo registros específicos, lo que puede permitir reportes negativos. En muchos casos, la amenaza de “manchar el Buró” es utilizada principalmente como herramienta de presión.",
   },
];

const MOVAPP_SECTION = [
   {
      id: "movapp-who",
      title: "¿Quién es Movapp?",
      content:
         "Movapp (Movimiento contra las aplicaciones pseudofinancieras) nace en 2020, durante la pandemia de COVID-19, como respuesta al crecimiento acelerado de aplicaciones de préstamos inmediatos que operaban mediante acoso y presión digital. La iniciativa surge a partir de la experiencia directa con este tipo de aplicaciones y evoluciona hacia una organización dedicada a apoyar a personas afectadas por esquemas conocidos como “montadeudas”. Movapp desarrolla una estrategia estructurada y probada para ayudar a las víctimas a recuperar el control y frenar el hostigamiento.",
   },
   {
      id: "movapp-trust",
      title: "¿Qué tan confiable es Movapp?",
      content:
         "Movapp cuenta con más de cinco años implementando la alternativa conocida como El Hack, una estrategia diseñada específicamente para enfrentar el fenómeno de las aplicaciones montadeudas. A lo largo de este tiempo, instituciones privadas y gubernamentales han mostrado interés en su trabajo, incluyendo organismos de seguridad, fiscalías y espacios académicos. Asimismo, el tema ha sido abordado en distintos medios de comunicación nacionales e internacionales.",
   },
   {
      id: "movapp-offer",
      title: "¿Qué ofrece Movapp para salir del problema de las apps montadeudas?",
      content:
         "Movapp ofrece una alternativa denominada El Hack, una herramienta tecnológica orientada a brindar una solución real ante el acoso, la extorsión, las amenazas y el uso indebido de información personal por parte de aplicaciones montadeudas. Esta estrategia busca reducir la capacidad de presión digital ejercida por este tipo de esquemas.",
   },
   {
      id: "movapp-services",
      title: "¿Qué servicios ofrece Movapp?",
      content:
         "El principal servicio de Movapp es la implementación de El Hack, acompañado de seguimiento personalizado para quienes lo adquieren. Un asesor especializado acompaña a cada persona hasta que el nivel de hostigamiento disminuya o cese. Adicionalmente, Movapp brinda orientación informativa y apoyo psicológico a víctimas, así como espacios de difusión y prevención en redes sociales.",
   },
];

function Section({ title, items }: { title: string; items: any[] }) {
   return (
      <View className="mb-4">
         <Text className="text-movapp-textSecondary text-xl font-bold text-center mb-6">{title}</Text>
         <View>
            {items.map((it) => (
               <View key={it.id} className="mb-3 px-2 ">
                  <FAQItem question={it.question ?? it.title} answer={it.answer ?? it.content} />
               </View>
            ))}
         </View>
      </View>
   );
}

export default function FAQsScreen() {
   const { user } = useApp();
   const isLoggedIn = user.logged;

   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="px-4 py-1 ">
            <View className="mb-8 flex-row items-center justify-center space-x-3">
               <Text className="text-white text-2xl font-bold mx-3 text-center">Preguntas frecuentes</Text>
            </View>

            {/* Secciones con título centrado y lista de preguntas desplegables */}
            <Section title="EL HACK" items={HACK_SECTION} />
            <Section title="ALCANCES Y LIMITACIONES DE APPS MONTADEUDAS" items={ALCANCES_SECTION} />
            <Section title="MOVAPP" items={MOVAPP_SECTION} />
         </View>
      </LayoutWithNavigation>
   );
}
