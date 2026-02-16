import { readMultipartFormData } from "h3";
import { createInstance } from "../../app/lib/imgkit";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const imagekit = createInstance({
    publicKey: config.public.imgkitPublicKey as string,
    privateKey: config.public.imgkitPrivateKey as string,
    urlEndpoint: config.public.imgkitUrlEndpoint as string,
  });

  const form = await readMultipartFormData(event);
  if (!form?.length) {
    throw createError({
      statusCode: 400,
      message: "Tidak ada file yang diunggah",
    });
  }

  const filePart = form.find((p) => p.name === "file" && p.data);
  if (!filePart?.data || !filePart.filename) {
    throw createError({
      statusCode: 400,
      message: "Field file wajib berisi gambar",
    });
  }

  const type = filePart.type ?? "";
  if (!ALLOWED_TYPES.includes(type)) {
    throw createError({
      statusCode: 400,
      message: "Format file harus JPG, PNG, WebP, atau GIF",
    });
  }

  if (filePart.data.length > MAX_SIZE) {
    throw createError({
      statusCode: 400,
      message: "Ukuran file maksimal 5MB",
    });
  }

  const ext = filePart.filename.split(".").pop() ?? "jpg";
  const fileName = `profile-${Date.now()}.${ext}`;

  const result = await imagekit.upload({
    file: filePart.data,
    fileName,
    folder: "/profiles",
    useUniqueFileName: true,
  });

  const url = (result as { url?: string }).url;
  if (!url) {
    throw createError({
      statusCode: 500,
      message: "Upload gagal",
    });
  }

  return { url };
});
