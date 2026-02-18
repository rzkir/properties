import { ref } from "vue";

import { toast } from "vue-sonner";

import { Role } from "@/lib/role";

import { apiFetch, getApiBaseUrl } from "@/lib/config";

// State global untuk auth
const user = ref<Accounts | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

let isAuthInitialized = false;

type BackendMe = {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  role: "admin" | "user" | string;
};

async function fetchMeFromBackend(): Promise<Accounts | null> {
  const base = getApiBaseUrl();
  if (!base) return null;
  try {
    const res = await apiFetch<{ data: BackendMe }>("/auth/me", { method: "GET" });
    const role = res.data.role === Role.ADMIN ? Role.ADMIN : Role.USER;
    return {
      id: res.data.uid,
      displayName: res.data.displayName ?? res.data.email ?? "User",
      email: res.data.email ?? "",
      phoneNumber: res.data.phoneNumber ?? "",
      photoURL: res.data.photoURL ?? undefined,
      role,
      provider: "email",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("[FE] /auth/me error:", e, e?.data);
    if (e?.status === 401) return null;
    throw e;
  }
}

const initAuth = () => {
  if (isAuthInitialized) return;
  isAuthInitialized = true;
  loading.value = true;
  fetchMeFromBackend()
    .then((me) => {
      user.value = me;
    })
    .catch(() => {
      user.value = null;
    })
    .finally(() => {
      loading.value = false;
    });
};

const stubAuthContext = (): AuthContext => ({
  user,
  loading,
  error,
  signIn: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
  signOut: async () => {},
});

/**
 * Composable utama auth: state user, loading, error, dan method signIn, signUp, signOut, dll.
 */
export function useAuthContext(): AuthContext {
  initAuth();

  const signIn = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();
      await apiFetch("/auth/login", {
        method: "POST",
        body: { email: normalizedEmail, password: normalizedPassword },
      });
      user.value = await fetchMeFromBackend();
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error("[FE] signIn error:", err, (err as any)?.data);
      const anyErr = err as any;
      error.value =
        anyErr?.data?.message ??
        (anyErr as { message?: string })?.message ??
        "Gagal masuk. Silakan coba lagi.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signUp = async (
    name: string,
    email: string,
    phoneNumber: string,
    password: string,
  ): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const payload: any = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        phoneNumber,
      };
      const trimmedName = name.trim();
      if (trimmedName) {
        payload.displayName = trimmedName;
      }

      await apiFetch("/auth/signup", {
        method: "POST",
        body: payload,
      });
      user.value = await fetchMeFromBackend();
    } catch (err: unknown) {
      const anyErr = err as any;
      error.value =
        anyErr?.data?.message ??
        (anyErr as { message?: string })?.message ??
        "Gagal mendaftar. Silakan coba lagi.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await apiFetch("/auth/reset-password", {
        method: "POST",
        body: { email: email.trim().toLowerCase() },
      });
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal mengirim email reset password.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      user.value = null;
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal keluar.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    resetPassword,
    signOut,
  };
}

/**
 * State & handler untuk halaman sign-in.
 */
export function useSignInState() {
  const router = useRouter();
  const { signIn, resetPassword, loading, error } = useAuthContext();

  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);
  const showPassword = ref(false);

  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };

  const onSubmit = async () => {
    try {
      await signIn(email.value, password.value);
      router.push("/");
    } catch {
      toast.error(error.value || "Gagal masuk. Silakan coba lagi.");
    }
  };

  const onForgotPassword = async () => {
    if (!email.value) {
      toast.warning("Silakan isi email terlebih dahulu.");
      return;
    }
    try {
      await resetPassword(email.value);
      toast.success("Link reset password telah dikirim ke email Anda.");
    } catch {
      toast.error(error.value || "Gagal mengirim link reset password.");
    }
  };

  return {
    email,
    password,
    rememberMe,
    showPassword,
    loading,
    togglePassword,
    onSubmit,
    onForgotPassword,
  };
}

/**
 * State & handler untuk halaman sign-up.
 */
export function useSignUpState() {
  const router = useRouter();
  const { signUp, loading, error } = useAuthContext();

  const name = ref("");
  const email = ref("");
  const phone = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  const agreeTerms = ref(false);

  const onSubmit = async () => {
    if (password.value !== confirmPassword.value) {
      toast.error("Kata sandi dan konfirmasi tidak sama.");
      return;
    }
    if (!agreeTerms.value) {
      toast.warning(
        "Anda harus menyetujui syarat & ketentuan terlebih dahulu.",
      );
      return;
    }
    try {
      await signUp(name.value, email.value, phone.value, password.value);
      toast.success("Pendaftaran berhasil. Silakan masuk.");
      router.push("/signin");
    } catch {
      toast.error(error.value || "Gagal mendaftar. Silakan coba lagi.");
    }
  };

  return {
    name,
    email,
    phone,
    password,
    confirmPassword,
    agreeTerms,
    loading,
    onSubmit,
  };
}
