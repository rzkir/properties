/**
 * Role untuk akun. Default: USER.
 * Pakai konstanta ini di runtime (bukan enum global yang hanya tipe).
 */
export const Role = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
