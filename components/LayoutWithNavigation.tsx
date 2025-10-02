import { View } from "react-native";

interface LayoutWithNavigationProps {
   children: React.ReactNode;
}

export default function LayoutWithNavigation({ children }: LayoutWithNavigationProps) {
   return <View className="flex-1">{children}</View>;
}
