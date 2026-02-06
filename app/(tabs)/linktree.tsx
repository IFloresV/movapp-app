// app/(tabs)/linktree.tsx
import React from "react";

import { getImage } from "@/utils/Images";

import LayoutWithNavigation from "@/components/LayoutWithNavigation";
import { Image, Linking, TouchableOpacity, View } from "react-native";

interface LinkItem {
   name: string;
   url: string;
   image: string;
   width: number;
   height: number;
}

const links: LinkItem[] = [
   {
      name: "Official Web",
      url: "https://www.movapp.org",
      image: "LINKTREE - WEB OFICIAL",
      width: 150,
      height: 30,
   },
   {
      name: "Youtube",
      url: "https://www.youtube.com/@elhackfunciona",
      image: "LINKTREE - YOUTUBE",
      width: 130,
      height: 30,
   },
   {
      name: "Instagram",
      url: "https://www.instagram.com/movappbymann",
      image: "LINKTREE - INSTAGRAM",
      width: 150,
      height: 30,
   },
   {
      name: "Facebook",
      url: "https://www.facebook.com/movappbymann",
      image: "LINKTREE - FACEBOOK",
      width: 130,
      height: 30,
   },
   {
      name: "TikTok",
      url: "https://www.tiktok.com/@movappbymann",
      image: "LINKTREE - TIK TOK",
      width: 160,
      height: 22,
   },
];

export default function LinktreeScreen() {
   const openUrl = async (url: string) => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
         await Linking.openURL(url);
      }
   };

   return (
      <LayoutWithNavigation scrollable={true} showLogo={false}>
         <View className="items-center mt-1">
            <View className="w-11/12 max-w-md items-center">
               <Image
                  source={getImage("LINKTREE - LOGO")}
                  style={{ width: "100%", height: 130 }}
                  resizeMode="contain"
               />
               <Image
                  source={getImage("LINKTREE - PARRAFO")}
                  style={{ width: "100%", height: 130 }}
                  resizeMode="contain"
                  className="mb-10"
               />
            </View>

            <View className="items-center">
               {links.map((link, index) => (
                  <TouchableOpacity key={index} onPress={() => openUrl(link.url)} className="mb-12">
                     <Image
                        source={getImage(link.image)}
                        style={{ width: link.width, height: link.height }}
                        resizeMode="contain"
                     />
                  </TouchableOpacity>
               ))}
            </View>
         </View>
      </LayoutWithNavigation>
   );
}
