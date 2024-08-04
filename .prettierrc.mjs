/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config & import("prettier-plugin-svelte").PrettierConfig}
 */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
  overrides: [
    {
      files: "*/*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*/*.svelte",
      options: {
        parser: "svelte",
      },
    },
    {
      files: "*/*.vue",
      options: {
        parser: "vue",
      },
    },
  ],
  svelteAllowShorthand: false,
  printWidth: 120,
};
