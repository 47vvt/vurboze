/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["pastel", "forest", "valentine", "retro", "coffee", "dracula"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

