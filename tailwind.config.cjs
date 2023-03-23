const colors = {
  red: "#FE5B6F",
  purple: "#B99DE4",
  yellow: "#FEBD5B",
  green: "#98F06F",
  blue: "#8AEBD9",
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ApfelGrotezk", "sans-serif"],
      },
      colors: {
        ...colors,
        black: "#1C1C1C",
        gray: "#ECF0F4",
        white: "#F8FBFF",
        current: "currentColor",
      },
    },
  },
  plugins: [],
}
