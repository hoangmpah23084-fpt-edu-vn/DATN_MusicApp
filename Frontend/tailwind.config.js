/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter, sans-serif"],
      },
      screens: {
        'xs': "430px",

        'sm': "640px",

        'md': "768px",

        'lg': "1024px",

        'xl': "1280px",

        "2xl": "1536px",
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("tailwind-scrollbar")],
};
