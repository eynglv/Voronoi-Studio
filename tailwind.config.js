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
      heading1: ["3.75rem", { lineHeight: "1" }],
      heading2: ["2.25rem", { lineHeight: "2.5rem" }],
      paragraph: ["1.5rem", { lineHeight: "2rem" }],
      paragraph2: ["1rem", { lineHeight: "1.5rem" }],
    },
    extend: {},
  },
  plugins: [],
};
