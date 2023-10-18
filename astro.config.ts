import { defineConfig } from "astro/config"
import icon from "astro-icon"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://astro.build/config
export default defineConfig({
  output: "static",
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
  integrations: [icon({ iconDir: "src/assets/icons" })],
})
