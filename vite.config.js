import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2(),
    legacy({
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
    }),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: [
          '@import "@/assets/scss/vuetify/variables"',
          '@import "vuetify/src/styles/settings/_variables"',
          "", // end with newline
        ].join("\n"),
      },
      scss: {
        additionalData: `@import "@/assets/scss/main.scss";`,
      },
    },
  },
  server: {
    port: 3001,
  },
  envPrefix: "APP_",
});
