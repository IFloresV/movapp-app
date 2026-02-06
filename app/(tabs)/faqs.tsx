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
         "El Hack es una herramienta tecnológica desarrollada para detener el acoso y la extorsión de aplicaciones de préstamos inmediatos. El Hack fue desarrollado por Erik Mann desde hace cinco años, y a través de Movapp comparte esta alternativa de solución ante las amenazas, hostigamiento, extorsión y pagos interminables que trae haber descargado estas aplicaciones.",
   },
   {
      id: "hack-how-to-get",
      title: "¿Cómo puedo adquirir el Hack?",
      content:
         "Para adquirir el hack es importante que nos escribas, y te podremos asignar un asesor experto en aplicaciones montadeudas, quien te brindará asesoría gratuita y te explicará las formas de adquirir el Hack.",
   },
   {
      id: "hack-privacy",
      title: "¿Si adquiero el Hack mis datos son expuestos?",
      content:
         "Una vez que adquieres el hack, o algún servicio otorgado por Movapp, tus datos quedan resguardados; en Movapp contamos con un aviso de privacidad de datos sensibles. Todos los datos que llegues a compartir con los asesores de Movapp, son exclusivamente para el proceso del Hack y quedan debidamente protegidos.",
   },
   {
      id: "hack-validity",
      title: "¿Qué vigencia tiene el Hack?",
      content:
         "El Hack no tiene fecha de caducidad, se aplica una vez y dura para siempre, toda vez que se sigan las recomendaciones que el asesor de Movapp te comparte.",
   },
];

const ALCANCES_SECTION = [
   {
      id: "alc-1",
      title: "¿Debo pagar a las aplicaciones montadeudas?",
      content:
         "Movapp se especializa en apps montadeudas, y desde esta especialización, la recomendación es no pagar préstamos anzuelos o préstamos ficticios.",
   },
   {
      id: "alc-2",
      title: "¿Van a mi casa los montadeudas para cobrarme si me atraso o no pago?",
      content:
         "Las investigaciones que ha realizado Movapp indican que el delito de las apps montadeudas se trata puramente de un delito digital, lo cual quiere decir que nunca habrá contacto físico con quien está cobrando. Suelen mentir, engañar y amenazar que harán visita a sus domicilios, sin embargo, al ser un delito digital, solo se queda en amenazas.",
   },
   {
      id: "alc-3",
      title: "¿Cómo obtienen mis datos las aplicaciones montadeudas?",
      content:
         "Una vez que descargamos una app montaduedas otorgamos permisos para que la aplicación pueda acceder a galería de fotos, ubicación, lista de contactos y mensajes SMS. Al dar acceso a estas aplicaciones se activa un virus llamado Spyloan que permite que los cobradores resguarden tu información.",
   },
   {
      id: "alc-4",
      title: "¿Las aplicaciones montadeudas me meten a buro de crédito?",
      content:
         "La mayoría de las apps montadeudas no cuentan con esta facultad, sin embargo, existen alrededor de cuatro a cinco de más de mil trescientas aplicaciones que ha pagado para conseguir un permiso de operación ante SIPRES, registro que les da la facultad de poner tache negativo en Buro de crédito, con la única finalidad de presionar para que nunca les dejes de pagar.",
   },
];

const MOVAPP_SECTION = [
   {
      id: "movapp-who",
      title: "¿Quién es Movapp?",
      content:
         "Movapp (Movimiento contra las aplicaciones pseudofinancieras) nace en el año 2020 durante la pandemia de COVID 19. Movapp es creado por Erik Mann, quien cayó en los prestamos inmediatos por necesidad. Movapp es una organización que ayuda a las personas víctima de las aplicaciones montadeudas, lo logra a través de toda una estrategia bien estructurada y comprobada.",
   },
   {
      id: "movapp-trust",
      title: "¿Qué tan confiable es Movapp?",
      content:
         "Movapp tiene más de 5 años proporcionando la alternativa del hack, lo cual ha permitido que instituciones privadas y gubernamentales pongan el ojo en Movapp, habiendo una respuesta positiva de instituciones como: CENEPRET, Guardia Nacional, Policía de Género y Fiscalías de México, así como escuelas y empresas privadas. Ha llamado la atención de noticieros nacionales e internacionales teniendo diversas entrevistas con su CEO Erik Mann.",
   },
   {
      id: "movapp-offer",
      title: "¿Qué ofrece Movapp para salir del problema de las apps montadeudas?",
      content:
         "Movapp ofrece una alternativa que es llamada El Hack, herramienta tecnológica que permite una solución real y efectiva ante el problema del acoso, extorsión, amenaza y robo de información de las apps montadeudas.",
   },
   {
      id: "movapp-services",
      title: "¿Qué servicios ofrece Movapp?",
      content:
         "El principal servicio que ofrece Movapp es el Hack acompañado del seguimiento a quienes adquieren dicho servicio; un asesor de Movapp acompaña a las personas hasta que las dejen de molestarlos los cobradores de apps montadeudas. Adicionalmente, Movapp ofrece atención psicológica para las víctimas y lives informativos en redes sociales con su CEO y equipo.",
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
