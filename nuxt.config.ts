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
          },
          orangered: {
            bg: {
              DEFAULT: "#131516",
            },
            main: {
              DEFAULT: "#F64504",
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
          },
        }),
      ],
    },
  },
});
