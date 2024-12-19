import { defineConfig } from "astro/config"
import aws from "astro-sst"
import icon from "astro-icon"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://astro.build/config
export default defineConfig({
  adapter: aws({
    deploymentStrategy: "static",
  }),
  server: {
    port: 3000,
  },
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  },
  integrations: [icon({ iconDir: "src/assets/icons" })],
})
