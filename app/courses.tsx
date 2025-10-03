import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { ScrollView, Text, View } from "react-native";

export default function Courses() {
   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black">
               {/* Hero Section */}
               <View className="bg-gradient-to-r from-movapp-blue to-movapp-black p-6 m-4 rounded-xl mt-48">
                  <Text className="text-white text-2xl font-bold text-center mb-2">Cursos! 🎓</Text>
               </View>
            </ScrollView>
         </LayoutWithNavigation>
      </>
   );
}
