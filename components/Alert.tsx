import { Colors } from "@/constants/Colors";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface AlertProps {
   type?: "success" | "error" | "warning" | "info";
   title?: string;
   message: string;
   visible: boolean;
   onAccept?: () => void;
   onCancel?: () => void;
   acceptText?: string;
   cancelText?: string;
   onlyAccept?: boolean;
}

const typeStyles = {
   success: {
      bg: "bg-movapp-card",
      border: "border border-green-500",
      text: "text-movapp-text",
      borderColor: Colors.movapp.primary,
   },
   error: {
      bg: "bg-movapp-card",
      border: "border border-red-500",
      text: "text-movapp-text",
      borderColor: Colors.movapp.red,
   },
   warning: {
      bg: "bg-movapp-card",
      border: "border border-yellow-500",
      text: "text-movapp-text",
      borderColor: Colors.movapp.primary,
   },
   info: {
      bg: "bg-movapp-card",
      border: "border border-movapp-primary",
      text: "text-movapp-text",
      borderColor: Colors.movapp.primary,
   },
};

export const Alert: React.FC<AlertProps> = ({
   type = "info",
   title,
   message,
   visible,
   onAccept,
   onCancel,
   acceptText = "Aceptar",
   cancelText = "Cancelar",
   onlyAccept = false,
}) => {
   const style = typeStyles[type];
   return (
      <Modal visible={visible} transparent animationType="fade">
         <View className="flex-1 justify-center items-center bg-black/60">
            <View
               className={`w-10/12 p-5 rounded-2xl ${style.bg} ${style.border}`}
               style={{ borderWidth: 1, borderColor: style.borderColor, minWidth: 280, maxWidth: 400 }}
            >
               {title && <Text className={`font-bold text-lg mb-3 ${style.text}`}>{title}</Text>}
               <Text className={`mb-6 ${style.text}`}>{message}</Text>
               <View className={`flex-row justify-end gap-3`}>
                  {!onlyAccept && (
                     <TouchableOpacity className="px-5 py-2 rounded-lg bg-gray-200" onPress={onCancel}>
                        <Text className="text-gray-700 font-semibold">{cancelText}</Text>
                     </TouchableOpacity>
                  )}
                  <TouchableOpacity
                     className="px-5 py-2 rounded-lg"
                     style={{ backgroundColor: style.borderColor }}
                     onPress={onAccept}
                  >
                     <Text className="text-white font-semibold">{acceptText}</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
   );
};

export default Alert;
