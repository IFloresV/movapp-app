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

interface VimeoPlayerVerticalProps {
   videos: { videoId: string }[];
   autoplayIndexes?: number[];
   style?: ViewStyle;
   allowsFullscreenVideo?: boolean;
}

export default function VimeoPlayerVertical({
   videos,
   autoplayIndexes = [],
   style,
   allowsFullscreenVideo = false,
}: VimeoPlayerVerticalProps) {
   return (
      <View style={[{ flexDirection: "row", width: "100%", flex: 1 }, style]}>
         {videos.slice(0, 2).map((video, idx) => {
            const [loading, setLoading] = useState(true);
            const vimeoUrl = `https://player.vimeo.com/video/${video.videoId}?autoplay=${autoplayIndexes.includes(idx) ? 1 : 0}&loop=0&muted=0&controls=1&autopause=0&background=0&texttrack=0&dnt=1`;
            const embedHTML = `
               <!DOCTYPE html>
               <html>
                  <head>
                     <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
                     <style>
                        html, body { height: 100%; width: 100%; margin: 0; padding: 0; background: #000; }
                        * { box-sizing: border-box; }
                        .video-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; background: #000; z-index: 9999; }
                           iframe { width: 100vw; height: 100vh; border: none; background: #000; }
                           /* Ocultar controles de subtítulos y configuración */
                           .vp-subtitles, .vp-controls .vp-controls-settings, .vp-controls .vp-controls-subtitles, .vp-controls .vp-controls-cc { display: none !important; }
                           /* Mover el botón de pantalla completa al primer lugar */
                           .vp-controls .vp-controls-fullscreen { order: -1 !important; }
                     </style>
                  </head>
                  <body>
                     <div class="video-container">
                        <iframe src="${vimeoUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                     </div>
                     <script src="https://player.vimeo.com/api/player.js"></script>
                  </body>
               </html>
            `;
            return (
               <View
                  key={video.videoId}
                  style={{ flex: 1, aspectRatio: 9 / 16, margin: 4, borderRadius: 18, overflow: "hidden" }}>
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
                     source={{ html: embedHTML }}
                     style={{ backgroundColor: "#000", flex: 1, borderRadius: 18, overflow: "hidden" }}
                     allowsFullscreenVideo={true}
                     androidHardwareAccelerationDisabled={false}
                     setSupportMultipleWindows={true}
                     mediaPlaybackRequiresUserAction={true}
                     javaScriptEnabled={true}
                     domStorageEnabled={true}
                     onLoadEnd={() => setLoading(false)}
                     scrollEnabled={false}
                     bounces={false}
                     androidLayerType="hardware"
                     // Forzar pantalla completa en Android
                  />
               </View>
            );
         })}
      </View>
   );
}
