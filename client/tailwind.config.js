/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brandBg: "#062c24",
        brandPanel: "#08352c",
        brandGreen: "#0a4a3d",
        brandGreen2: "#0d6b57",
        brandYellow: "#d9ff4a",
        brandYellow2: "#bff22f",
      },
    },
  },
  plugins: [],
};
