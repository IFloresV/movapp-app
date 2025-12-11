// components/FAQItem.tsx
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FAQItemProps {
   question: string;
   answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
   const [isExpanded, setIsExpanded] = useState(false);

   return (
      <View className="mb-2 bg-movapp-linkBackgroundHome rounded-2xl overflow-hidden">
         <TouchableOpacity
            className="flex-row items-center text-justify p-5"
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
         >
            <Text className="text-movapp-textSecondary text-center font-semibold flex-1 pr-4 ">{question}</Text>
            <View style={{ transform: [{ rotate: isExpanded ? "180deg" : "0deg" }] }}>
               <Feather name="chevron-down" size={24} color={Colors.movapp.primary} />
            </View>
         </TouchableOpacity>

         {isExpanded && (
            <View className="px-5 pb-5 pt-0">
               <View className="h-px bg-movapp-borderCard mb-4" />
               <Text className="text-movapp-textSecondary text-justify leading-6">{answer}</Text>
            </View>
         )}
      </View>
   );
}
