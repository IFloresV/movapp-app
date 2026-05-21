import React, { useState } from "react";
import { ActivityIndicator, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

interface VimeoPlayerProps {
   videoId: string;
   autoplay?: boolean;
   loop?: boolean;
   muted?: boolean;
   controls?: boolean;
   allowsFullscreenVideo?: boolean;
   style?: ViewStyle;
   aspectRatio?: number; // Default 16:9 = 0.5625 (9/16)
}

export default function VimeoPlayer({
   videoId,
   autoplay = false,
   loop = false,
   muted = false,
   controls = true,
   allowsFullscreenVideo = false,
   style,
   aspectRatio = 0.5625,
}: VimeoPlayerProps) {
   const [loading, setLoading] = useState(true);

   // Construir URL del iframe de Vimeo con parámetros
   const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&loop=${
      loop ? 1 : 0
   }&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&autopause=0&background=0`;

   // HTML del iframe embebido
   const embedHTML = `
      <!DOCTYPE html>
      <html>
         <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
               * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
               }
               body {
                  background-color: #000;
                  overflow: hidden;
               }
               .video-container {
                  position: relative;
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
               }
               iframe {
                  width: 100%;
                  height: 100%;
                  border: none;
               }
            </style>
         </head>
         <body>
            <div class="video-container">
               <iframe
                  src="${vimeoUrl}"
                  frameborder="0"
                  allow="autoplay; picture-in-picture"
               ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
         </body>
      </html>
   `;

   return (
      <View style={[{ width: "100%", flex: 1 }, style]}>
         {loading && (
            <View
               style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#000",
                  zIndex: 1,
               }}>
               <ActivityIndicator size="large" color="#fff" />
            </View>
         )}
         <WebView
            source={{ html: embedHTML, baseUrl: "https://player.vimeo.com" }}
            originWhitelist={["*"]}
            style={{ backgroundColor: "#000", flex: 1 }}
            allowsFullscreenVideo={allowsFullscreenVideo}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={!autoplay}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            onLoadEnd={() => setLoading(false)}
            scrollEnabled={false}
            bounces={false}
         />
      </View>
   );
}
