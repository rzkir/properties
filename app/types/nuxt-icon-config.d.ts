import '@nuxt/schema';

declare module '@nuxt/schema' {
  interface NuxtConfig {
    icon?: {
      size?: string;
      class?: string;
    };
  }

  interface NuxtOptions {
    icon?: {
      size?: string;
      class?: string;
    };
  }
}