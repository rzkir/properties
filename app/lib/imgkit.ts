import ImageKit from "imagekit";

export type ImageKitConfig = {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
};

function getEnvConfig(): ImageKitConfig {
  return {
    publicKey: process.env.NUXT_PUBLIC_IMGKIT_PUBLIC_KEY as string,
    privateKey: process.env.NUXT_PUBLIC_IMGKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.NUXT_PUBLIC_IMGKIT_URL_ENDPOINT as string,
  };
}

/** Buat instance ImageKit. Di server API bisa pakai: createInstance(useRuntimeConfig().public) */
export function createInstance(config?: ImageKitConfig) {
  const c = config ?? getEnvConfig();
  return new ImageKit(c);
}

const imagekitInstance = createInstance();

export default imagekitInstance;
