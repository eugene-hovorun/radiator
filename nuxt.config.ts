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
  site: {
    url: "https://www.radiator.cc/",
    name: "Radiator",
    description:
      "App that lets you listen to radio stations from around the world!",
    defaultLocale: "en",
  },
  modules: [
    "@nuxtjs/seo",
    "@pinia/nuxt",
    "nuxt-vercel-analytics",
    "nuxt-gtag",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Inter: [400, 700, 900],
        },
        display: "swap",
      },
    ],
  ],
  gtag: {
    id: "G-7DC0E80PQR",
  },
});
