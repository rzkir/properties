import { z } from 'zod'

/** Format nomor telepon Indonesia (opsional): +62 atau 0 diikuti 9–12 digit */
const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/

export const profileFormSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Nama lengkap wajib diisi')
    .min(2, 'Nama minimal 2 karakter'),
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || val.trim() === '' || phoneRegex.test(val.replace(/\s/g, '')), {
      message: 'Format nomor WhatsApp tidak valid (contoh: +6281234567890)',
    }),
  areaDomisili: z.string().optional(),
  photoURL: z.union([z.string().url('URL foto tidak valid'), z.literal('')]).optional(),
})

export const changePasswordSchema = z
  .object({
    current: z.string().min(1, 'Sandi lama wajib diisi'),
    new: z
      .string()
      .min(1, 'Sandi baru wajib diisi')
      .min(6, 'Sandi baru minimal 6 karakter'),
    confirm: z.string().min(1, 'Konfirmasi sandi wajib diisi'),
  })
  .refine((data) => data.new === data.confirm, {
    message: 'Konfirmasi sandi tidak cocok',
    path: ['confirm'],
  })

export type ProfileFormInput = z.infer<typeof profileFormSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>

/**
 * Mengembalikan pesan error pertama per field dari hasil safeParse Zod.
 * Cocok untuk ditampilkan di bawah input.
 */
export function getFirstErrors<T>(
  result: { success: false; error: z.ZodError<T> } | { success: true; data: T },
): Record<string, string> {
  if (result.success) return {}
  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const path = issue.path.join('.')
    if (!(path in errors)) errors[path] = issue.message
  }
  return errors
}
