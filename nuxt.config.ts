import { defineNuxtConfig } from "nuxt";
import svgLoader from 'vite-svg-loader'
import graphql from "@rollup/plugin-graphql";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: [/oruga/, "@heroicons/vue", "graphql", "@urql/vue"],
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  vite: {
    plugins: [
      graphql(),
      svgLoader({})
    ]
  },

  css: ["@/assets/css/main.css"],

  ssr: true,

  runtimeConfig: {
    public: {
      apiEndpoint: "",
      accessToken: "",
    },
  },
});
