// SpotifyPlayer.js
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

type SpotifyPlayerProps = {
   playlistId: string; // 👈 ahora es obligatorio
   height?: number;
   theme?: "dark" | "light";
   autoPlay?: boolean;
};

const SpotifyPlayer = ({ playlistId, height = 380, theme = "dark", autoPlay = false }: SpotifyPlayerProps) => {
   const [loading, setLoading] = useState(true);

   // Construir URL SOLO para playlist
   const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=${
      theme === "dark" ? "0" : "1"
   }`;

   // HTML del iframe
   const htmlContent = `
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
            background-color: ${theme === "dark" ? "#121212" : "#ffffff"};
            overflow: hidden;
          }
          iframe {
            border: none;
            width: 100%;
            height: ${height}px;
            border-radius: 12px;
          }
        </style>
      </head>
      <body>

        <iframe
          src="${embedUrl}"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <script>
          // BLOQUEAR TODOS los clics (evita que abra Spotify app)
          document.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
          }, true);
        </script>

      </body>
    </html>
  `;

   return (
      <View style={[styles.container, { height }]}>
         {loading && (
            <View style={styles.loadingContainer}>
               <ActivityIndicator size="large" color="#1DB954" />
            </View>
         )}

         <WebView
            source={{ html: htmlContent }}
            style={styles.webview}
            onLoadEnd={() => setLoading(false)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={!autoPlay}
            allowsInlineMediaPlayback={true}
            userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X)"
            // 👇 Bloquear enlaces que intenten salir del iframe
            onShouldStartLoadWithRequest={(req) => {
               if (req.url.startsWith("https://open.spotify.com/embed/")) return true;
               return false; // bloquear todo lo demás
            }}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: "#121212",
   },
   webview: {
      flex: 1,
      backgroundColor: "transparent",
   },
   loadingContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#121212",
      zIndex: 1,
   },
});

export default SpotifyPlayer;
