import tailwindcss from "@tailwindcss/vite";

import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  typescript: {
    typeCheck: false,
  },
  ssr: true,
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css", "vue-sonner/style.css"],
  modules: ["shadcn-nuxt", "@nuxt/icon"],
  runtimeConfig: {
    public: {
      imgkitPublicKey: "",
      imgkitPrivateKey: "",
      imgkitUrlEndpoint: "",
      firebaseApiKey: "",
      firebaseAuthDomain: "",
      firebaseDatabaseURL: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMeasurementId: "",
    },
  },
  icon: {
    size: "24px",
    class: "inline-block align-middle",
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === "iconify-icon",
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 700,
      rollupOptions: {
        output: {
          manualChunks: {
            "vue-vendor": ["vue", "vue-router"],
            "ui-vendor": [
              "reka-ui",
              "class-variance-authority",
              "clsx",
              "tailwind-merge",
            ],
          },
        },
      },
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
