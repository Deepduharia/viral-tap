/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a0e21",
        charcoal: "#1a1a2e",
        violet: "#8b5cf6",
        "electric-blue": "#3b82f6",
      }
    },
  },
  plugins: [],
}
/** @type {import('postcss').Config} */
module.exports = {
  plugins: [require("tailwindcss")],
}
