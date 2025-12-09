import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { Image, ScrollView, Text } from "react-native";

export default function MindScreen() {
   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black mx-2 rounded-2xl p-4">
               <Text className="text-white text-2xl font-bold text-center mb-2">Mente digital </Text>

               <Image
                  source={require("@/assets/images/mind.jpg")}
                  style={{ width: 250, height: 300, alignSelf: "center", marginVertical: 24, borderRadius: 36 }}
                  resizeMode="contain"
               />

               <SpotifyPlayer playlistId="5KMbt5sI9mUetg1kIHRFGB" height={400} />

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
