// In order for `prettier` to work in `astro` files,
// follow this steps: https://github.com/withastro/prettier-plugin-astro#using-in-vs-code

/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  plugins: [
    require("prettier-plugin-astro"),
    require("prettier-plugin-tailwindcss"),
  ],
  overrides: [
    {
      files: "**/*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
}
