/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {},
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
      Montserrat: ["Montserrat", "sans-serif"],
    },
    screens: {
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
      h1: { raw: "(min-height: 400px)" },
      h2: { raw: "(min-height: 600px)" },
      h3: { raw: "(min-height: 800px)" },
      h4: { raw: "(min-height: 900px)" },
    },
  },
  plugins: [],
};
