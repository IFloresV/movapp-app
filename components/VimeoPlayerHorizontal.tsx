import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Pressable, View, ViewStyle } from "react-native";
import { WebView } from "react-native-webview";

interface VimeoPlayerHorizontalProps {
   videoId: string;
   autoplay?: boolean;
   loop?: boolean;
   muted?: boolean;
   controls?: boolean;
   allowsFullscreenVideo?: boolean;
   /** Muestra los botones de adelantar / atrasar 10s. Default true. */
   showSeekButtons?: boolean;
   /** Segundos que avanza/retrocede cada botón. Default 10. */
   seekSeconds?: number;
   style?: ViewStyle;
}

export default function VimeoPlayerHorizontal({
   videoId,
   autoplay = false,
   loop = false,
   muted = false,
   controls = true,
   allowsFullscreenVideo = true,
   showSeekButtons = true,
   seekSeconds = 10,
   style,
}: VimeoPlayerHorizontalProps) {
   const [loading, setLoading] = useState(true);
   const webViewRef = useRef<WebView>(null);

   const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&loop=${
      loop ? 1 : 0
   }&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&autopause=0&background=0&texttrack=0&dnt=1&playsinline=1`;

   const embedHTML = `
      <!DOCTYPE html>
      <html>
         <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <style>
               html, body { height: 100%; width: 100%; margin: 0; padding: 0; background: #000; }
               * { box-sizing: border-box; }
               .video-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; }
               iframe { width: 100vw; height: 100vh; border: none; background: #000; }
            </style>
         </head>
         <body>
            <div class="video-container">
               <iframe id="vimeo" src="${vimeoUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
            <script>
               var player = new Vimeo.Player(document.getElementById('vimeo'));

               // Mensajes enviados desde React Native (seek / fullscreen)
               function handleMessage(raw) {
                  try {
                     var msg = JSON.parse(raw);
                     if (msg.action === 'seek') {
                        player.getCurrentTime().then(function (t) {
                           player.setCurrentTime(Math.max(0, t + msg.offset));
                        });
                     } else if (msg.action === 'fullscreen') {
                        if (player.requestFullscreen) {
                           player.requestFullscreen().catch(function () {});
                        }
                     }
                  } catch (e) {}
               }
               // Android e iOS exponen el listener en objetos distintos
               document.addEventListener('message', function (e) { handleMessage(e.data); });
               window.addEventListener('message', function (e) { handleMessage(e.data); });
            </script>
         </body>
      </html>
   `;

   const postToPlayer = (payload: object) => {
      webViewRef.current?.postMessage(JSON.stringify(payload));
   };

   const seek = (offset: number) => postToPlayer({ action: "seek", offset });
   const requestFullscreen = () => postToPlayer({ action: "fullscreen" });

   return (
      <View style={[{ width: "100%", aspectRatio: 16 / 9, borderRadius: 18, overflow: "hidden" }, style]}>
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
                  zIndex: 2,
               }}
            >
               <ActivityIndicator size="large" color="#fff" />
            </View>
         )}

         <WebView
            ref={webViewRef}
            source={{ html: embedHTML, baseUrl: "https://player.vimeo.com" }}
            originWhitelist={["*"]}
            style={{ backgroundColor: "#000", flex: 1, borderRadius: 18, overflow: "hidden" }}
            allowsFullscreenVideo={allowsFullscreenVideo}
            setSupportMultipleWindows={false}
            mediaPlaybackRequiresUserAction={!autoplay}
            allowsInlineMediaPlayback={true}
            mixedContentMode="always"
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadEnd={() => setLoading(false)}
            scrollEnabled={false}
            bounces={false}
            androidLayerType="hardware"
         />

         {!loading && showSeekButtons && (
            <View
               pointerEvents="box-none"
               style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  flexDirection: "row",
                  zIndex: 3,
               }}
            >
               <Pressable
                  onPress={() => seek(-seekSeconds)}
                  hitSlop={8}
                  style={{
                     backgroundColor: "rgba(0,0,0,0.6)",
                     borderRadius: 20,
                     padding: 8,
                     marginRight: 8,
                  }}
               >
                  <Ionicons name="play-back" size={18} color="#fff" />
               </Pressable>
               <Pressable
                  onPress={() => seek(seekSeconds)}
                  hitSlop={8}
                  style={{
                     backgroundColor: "rgba(0,0,0,0.6)",
                     borderRadius: 20,
                     padding: 8,
                     marginRight: 8,
                  }}
               >
                  <Ionicons name="play-forward" size={18} color="#fff" />
               </Pressable>
               {allowsFullscreenVideo && (
                  <Pressable
                     onPress={requestFullscreen}
                     hitSlop={8}
                     style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        borderRadius: 20,
                        padding: 8,
                     }}
                  >
                     <Ionicons name="expand" size={18} color="#fff" />
                  </Pressable>
               )}
            </View>
         )}
      </View>
   );
}
