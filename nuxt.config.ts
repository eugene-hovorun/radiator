// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [400, 700],
        },
        display: "swap",
      },
    ],
  ],
});
