import { createThemes } from "tw-colors";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "nuxt-vercel-analytics",
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
  tailwindcss: {
    config: {
      plugins: [
        createThemes({
          steelblue: {
            bg: {
              DEFAULT: "#111111",
            },
            main: {
              DEFAULT: "#4981b2",
            },
            "text-dark": {
              DEFAULT: "#222c35",
            },
            "text-light": {
              DEFAULT: "#ffffff",
            },
            border: {
              DEFAULT: "#141a1f",
            },
            shadow: {
              DEFAULT: "#111213",
            },
          },
          orangered: {
            bg: {
              DEFAULT: "#131516",
            },
            main: {
              DEFAULT: "#F45506",
            },
            "text-dark": {
              DEFAULT: "#000000",
            },
            "text-light": {
              DEFAULT: "#FFFFFF",
            },
            border: {
              DEFAULT: "#1E2021",
            },
            shadow: {
              DEFAULT: "#121417",
            },
          },
          flag: {
            bg: {
              DEFAULT: "#1E1E1E",
            },
            main: {
              DEFAULT: "#D1D1D1",
            },
            "text-dark": {
              DEFAULT: "#1E1E1E",
            },
            "text-light": {
              DEFAULT: "#EEEEEE",
            },
            border: {
              DEFAULT: "#2E2E2E",
            },
            shadow: {
              DEFAULT: "#1C1C1C",
            },
          },
          deeppurple: {
            bg: {
              DEFAULT: "#212121",
            },
            main: {
              DEFAULT: "#B980F5",
            },
            "text-dark": {
              DEFAULT: "#26202E",
            },
            "text-light": {
              DEFAULT: "#F2F0F5",
            },
            border: {
              DEFAULT: "#121212",
            },
            shadow: {
              DEFAULT: "#1F1F1F",
            },
          },
          sunlit: {
            bg: {
              DEFAULT: "#1A1F25",
            },
            main: {
              DEFAULT: "#FED428",
            },
            "text-dark": {
              DEFAULT: "#000000",
            },
            "text-light": {
              DEFAULT: "#FFFFFF",
            },
            border: {
              DEFAULT: "#272C35",
            },
            shadow: {
              DEFAULT: "#1A1D23",
            },
          },
        }),
      ],
    },
  },
});
