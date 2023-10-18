import type { Config } from "tailwindcss"

export const colors = {
  red: "#FE5B6F",
  purple: "#B99DE4",
  yellow: "#FEBD5B",
  green: "#98F06F",
  blue: "#8AEBD9",
} as const

export default {
  content: ["./src/**/*.{astro,html,ts,tsx}"],
  theme: {
    screens: {
      xs: "500px",
    },
    extend: {
      fontFamily: {
        sans: ["Apfel Grotezk", "Apfel Grotezk Fallback"],
      },
      colors: {
        ...colors,
        color: "var(--color)",
        black: "#1C1C1C",
        gray: "#ECF0F4",
        white: "#F8FBFF",
        current: "currentColor",
      },
    },
  },
  plugins: [],
} satisfies Config
