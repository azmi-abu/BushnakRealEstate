/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
    sans: ["Montserrat", "Heebo", "system-ui", "sans-serif"],
  },
      colors: {
        /* BRAND COLORS (from logo) */
        brandBg: "#053827",
        brandPanel: "#042e22",
        brandGreen2: "#064130",
        brandYellow: "#f0d186",
        brandYellow2: "#f6dd9f",
      },
    },
  },
  plugins: [],
};
