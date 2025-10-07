import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Image, ScrollView, Text } from "react-native";

export default function MindScreen() {
   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black mx-2 rounded-2xl p-4">
               <Text className="text-white text-2xl font-bold text-center mb-2">Mente digital </Text>

               {/* <Text className="text-gray-300 text-base mb-2 text-justify">
                  Este es un espacio dedicado a ayudarte a recuperar la paz emocional. Si has sido víctima de las
                  aplicaciones no reguladas, llamadas montadeudas, y sientes que no hay salida, este es el lugar donde
                  encontrarás las herramientas para sanar mental y emocionalmente.
               </Text>
               <Text className=" text-gray-300 text-base mb-2 text-justify">
                  Te quiero guiar hacia un mayor bienestar emocional. Quiero brindarte las herramientas para que superes
                  esta difícil situación y recuperes el control de tu vida.
               </Text> */}

               <Image
                  source={require("@/assets/images/mind.jpg")}
                  style={{ width: 250, height: 300, alignSelf: "center", marginVertical: 24, borderRadius: 36 }}
                  resizeMode="contain"
               />

               <Text className=" text-white text-2xl text-center font-bold my-3">
                  ¿Cómo obtener el apoyo psicológico?
               </Text>

               <Text className=" text-gray-300 text-base mb-2 text-justify">
                  1. Contáctanos al chat principal y pregunta a tu asesor por el servicio.
               </Text>
               <Text className=" text-gray-300 text-base mb-2 text-justify">2. Agenda tu cita.</Text>
               <Text className=" text-gray-300 text-base mb-2 text-justify">
                  3. Mi equipo y yo te estaremos brindando apoyo.
               </Text>
               <Text className=" text-gray-300 text-base mb-2 text-justify">4. Recupera tu vida.</Text>
            </ScrollView>
         </LayoutWithNavigation>
      </>
   );
}
