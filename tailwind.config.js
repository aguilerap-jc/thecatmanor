/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snow: "#FAFAFA",
        ash: "#BDBDBD",
        charcoal: "#333333",
        dusty: "#CBBBA0",
        sage: "#9BAF9B",
        terracotta: "#D17A66",
      },
    },
  },
  plugins: [],
};