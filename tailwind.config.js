/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all of your component files.
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {
         colors: {
            movapp: {
               purple: "#8149E2",
               black: "#000000",

               dark: "#1e1b4b",
               light: "#f8fafc",
            },
         },
      },
   },
   plugins: [],
};
