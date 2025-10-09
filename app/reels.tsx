import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";

import UserContext from "@/context/UserContext";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";

export default function ReelsScreen() {
   const { user, dispatchUser } = useContext(UserContext)!;
   console.log("user desde REELS", user);

   return (
      <>
         <LayoutWithNavigation>
            <ScrollView className="flex-1 bg-movapp-black">
               {/* Hero Section */}
               <View className="bg-gradient-to-r from-movapp-blue to-movapp-black p-6 m-4 rounded-xl mt-48">
                  <Text className="text-white text-2xl font-bold text-center mb-2">Reels 🎥</Text>
               </View>
            </ScrollView>
         </LayoutWithNavigation>
      </>
   );
}
