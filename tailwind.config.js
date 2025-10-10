/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all of your component files.
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         colors: {
            movapp: {
               background: "#050505",
               primary: "#8149E2",
               text: "#ffffff",

               linkBackgroundHome: "#030312",

               linkBackground: "#01010A",
               linkBorder: "#060114",

               linkIcon: "#8149E2",
               linkText: "#FFFFFF",

               bgTabsNav: "#050505",

               card: "#01010A",

               cardProfile: "#060114",

               borderCard: "#374151",
            },
         },
      },
   },
   plugins: [],
};
