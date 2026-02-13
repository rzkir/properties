import tailwindcss from "@tailwindcss/vite";

import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  typescript: {
    typeCheck: 'build',
  },
  ssr: true,
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['shadcn-nuxt', '@nuxt/icon'],
  icon: {
    size: '24px',
    class: 'inline-block align-middle'
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'iconify-icon',
    },
  },
  vite: {
    plugins: [
      tailwindcss() as any,
    ],
    build: {
      sourcemap: false,
    },
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  }
})