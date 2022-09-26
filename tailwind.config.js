/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ApfelGrotezk", "sans-serif"],
    },
    extend: {
      colors: {
        black: "#1C1C1C",
        gray: "#ECF0F4",
        white: "#F8FBFF",
        current: "currentColor",
      },
    },
  },
  plugins: [],
}
