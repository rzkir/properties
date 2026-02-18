// @ts-ignore - package has no bundled type declarations
import tailwindcss from "@tailwindcss/vite";
// @ts-ignore - types are not required for this build-time plugin
import { visualizer } from "rollup-plugin-visualizer";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  typescript: {
    typeCheck: false,
    shim: false,
    strict: false,
  },
  ssr: false,
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css", "vue-sonner/style.css"],
  modules: ["shadcn-nuxt", "@nuxt/icon", "@nuxtjs/color-mode"],
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    public: {
      apiSecret: "",
      apiUrl: "",
    },
  },
  // @ts-ignore - extended by @nuxt/icon module at runtime
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
        plugins: (process.env.ANALYZE === "true"
          ? [
            visualizer({
              filename: "stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
          ]
          : []) as any,
      },
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
