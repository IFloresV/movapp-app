import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Image, ScrollView, Text } from "react-native";

export default function MindScreen() {
   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black mx-2 rounded-2xl p-4">
               <Text className="text-white text-2xl font-bold text-center mb-2">Mente digital </Text>

               <Image
                  source={require("@/assets/images/mind.jpg")}
                  style={{ width: 150, height: 200, alignSelf: "center", marginVertical: 24, borderRadius: 22 }}
                  resizeMode="contain"
               />

               {/* <SpotifyPlayer playlistId="5KMbt5sI9mUetg1kIHRFGB" height={400} /> */}

               <Text className=" text-white text-2xl text-center font-bold my-3">Bienvenido a mente digital</Text>

               <Text className=" text-gray-300 text-base mb-2 text-justify">
                  Este es un espacio dedicado a ayudarte a recuperar la paz emocional. Si has sido víctima de las
                  aplicaciones no reguladas, llamadas montadeudas, y sientes que no hay salida, este es el lugar donde
                  encontrarás las herramientas para sanar mental y emocionalmente. Dra. Dalia Te quiero guiar hacia un
                  mayor bienestar emocional. Quiero brindarte las herramientas para que superes esta difícil situación y
                  recuperes el control de tu vida.
               </Text>

               <Text className=" text-white text-2xl text-center font-bold my-3">
                  Tu bienestar es importante para nosotros
               </Text>
               <Text className=" text-gray-300 text-base mb-2 text-justify">
                  Sabemos que superar una situación como la que vives puede parecer abrumador, pero no estás solo. Con
                  Movapp y el respaldo de Mente Digital, podrás encontrar un camino hacia la tranquilidad, tanto digital
                  como emocional. Aquí, nos comprometemos a brindarte todo el apoyo necesario para que no solo protejas
                  tus datos, sino que también recuperes la paz mental.
               </Text>

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
