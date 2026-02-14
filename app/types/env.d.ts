declare const process: {
  env: {
    NUXT_PUBLIC_FIREBASE_API_KEY?: string;
    NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
    NUXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
    NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
    NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
    NUXT_PUBLIC_FIREBASE_APP_ID?: string;
    NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
    [key: string]: string | undefined;
  };
};