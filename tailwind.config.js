/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./client/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: colors.zinc,
      secondary: colors.cyan,
      accent: colors.orange,
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    fontSize: {
      paragraph: ["1.5rem", { lineHeight: "2rem" }],
      heading1: ["3.75rem", { lineHeight: "1" }],
    },
    extend: {},
  },
  plugins: [],
};
