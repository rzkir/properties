import type { Ref } from 'vue';

declare global {
  interface Accounts {
    id: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL?: string;
    role: 'admin' | 'user';
    provider: 'email';
    createdAt: Date | string | number | null;
    updatedAt: Date | string | number | null;
  }

  interface AuthContext {
    user: Ref<Accounts | null>;
    loading: Ref<boolean>;
    error: Ref<string | null>;

    /**
     * Masuk menggunakan email & password.
     */
    signIn(email: string, password: string): Promise<void>;

    /**
     * Daftar akun baru menggunakan email & password.
     * Name & phoneNumber disimpan sebagai profil dasar.
     */
    signUp(
      name: string,
      email: string,
      phoneNumber: string,
      password: string,
    ): Promise<void>;

    /**
     * Mengirim email reset password ke alamat email yang didaftarkan.
     */
    resetPassword(email: string): Promise<void>;

    /**
     * Keluar dari sesi saat ini.
     */
    signOut(): Promise<void>;
  }
}

export {};