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
              DEFAULT: "#3e2f29",
            },
            main: {
              DEFAULT: "#f64504",
            },
            "text-dark": {
              DEFAULT: "#331306",
            },
            "text-light": {
              DEFAULT: "#ffffff",
            },
            border: {
              DEFAULT: "#411b0d",
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
        }),
      ],
    },
  },
});
