import childProcess from "child_process";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      branch: childProcess
        .execSync("git rev-parse --abbrev-ref HEAD")
        .toString()
        .trim(),
    },
  },
  modules: [
    "@pinia/nuxt",
    "nuxt-vercel-analytics",
    "nuxt-gtag",
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
  gtag: {
    id: "G-7DC0E80PQR",
  },
});
