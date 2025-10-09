// app/(tabs)/faqs.tsx
import FAQItem from "@/components/FAQItem";
import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Image, Text, View } from "react-native";

const FAQS_DATA = [
   {
      id: "1",
      question: "¿Cómo puedo adquirir EL HACK?",
      answer:
         "Nuestras asistentes de chat te brindarán una primera atención. Están capacitadas para atenderte con empatía y de manera profesional",
   },
   {
      id: "2",
      question: "¿Qué indicaciones debo seguir después del HACK?",
      answer:
         "Tenemos el más amplio catálogo de aplicaciones montadeudas sobre las que aplicamos el hack ya que tenemos presencia en muchos países de latinoamérica.",
   },
   {
      id: "3",
      question: "¿EL HACK lo aplica el asesor?",
      answer:
         "Al igual que tú, todos nuestros asesores sufrieron de acoso por parte de los montadeudas.Llegaste al lugar más adecuado. Tu asesor te escuchará atentamente y será empático con tu situación.",
   },
];

export default function FAQsScreen() {
   return (
      <LayoutWithNavigation scrollable={true}>
         <View className="px-4 py-6">
            {/* Header descriptivo */}
            <View className="mb-6 flex-row items-center space-x-3">
               <Text className="text-white text-2xl font-bold mx-3 ">Preguntas frecuentes sobre</Text>
               <Image
                  source={require("@/assets/images/elhack.png")}
                  style={{ width: 72, height: 70 }}
                  resizeMode="contain"
               />
            </View>

            {/* Lista de FAQs */}
            {FAQS_DATA.map((faq) => (
               <FAQItem key={faq.id} question={faq.question} answer={faq.answer} />
            ))}
         </View>
      </LayoutWithNavigation>
   );
}
