import { ref, reactive, computed, watch } from "vue";

import { toast } from "vue-sonner";

import { Role } from "@/lib/role";

import { apiFetch, getApiBaseUrl, getApiSecret } from "@/lib/config";

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
 * State & handler untuk halaman profil / pengaturan akun.
 */
export function useProfileSettingsState() {
  const apiSecret = getApiSecret();
  const auth = useAuthContext();
  const { user, signOut } = auth;

  const form = reactive({
    displayName: "",
    email: "",
    phoneNumber: "",
    areaDomisili: "",
    photoURL: "",
  });

  const photoLoadError = ref(false);

  watch(
    user,
    (u) => {
      if (u) {
        form.displayName = u.displayName ?? "";
        form.email = u.email ?? "";
        form.phoneNumber = u.phoneNumber ?? "";
        form.areaDomisili = "";
        form.photoURL = u.photoURL ?? "";
        photoLoadError.value = false;
      }
    },
    { immediate: true },
  );

  const password = reactive({
    current: "",
    new: "",
    confirm: "",
  });

  const passwordStrength = computed(() => {
    const p = password.new;
    if (!p.length) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 10 || /[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) s++;
    return Math.min(3, s + (p.length >= 8 ? 1 : 0));
  });

  const passwordStrengthLabel = computed(() => {
    const s = passwordStrength.value;
    return s === 0 ? "—" : s === 1 ? "Lemah" : s === 2 ? "Sedang" : "Kuat";
  });

  const notif = reactive({
    updateProperti: true,
    promoEksklusif: false,
    pesanMarketing: true,
  });

  const twoFaEnabled = ref(false);

  const privacy = reactive({
    profilPublik: true,
    tampilkanAktivitas: false,
  });

  const profileErrors = ref<Record<string, string>>({});
  const passwordErrors = ref<Record<string, string>>({});
  const uploadingPhoto = ref(false);

  watch(
    form,
    () => {
      profileErrors.value = {};
    },
    { deep: true },
  );

  watch(
    password,
    () => {
      passwordErrors.value = {};
    },
    { deep: true },
  );

  async function onPhotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const currentUser = user.value;
    if (!currentUser?.id) {
      profileErrors.value = {
        ...profileErrors.value,
        photoURL: "User tidak ditemukan",
      };
      return;
    }

    uploadingPhoto.value = true;
    profileErrors.value = { ...profileErrors.value, photoURL: "" };
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await apiFetch<{
        url?: string;
        data?: { url?: string };
        message?: string;
      }>("/upload", {
        method: "POST",
        body: formData,
        headers: {
          "x-api-secret": apiSecret,
        },
      });

      const photoURL = res.url ?? res.data?.url;
      if (!photoURL) {
        profileErrors.value = {
          ...profileErrors.value,
          photoURL: "URL foto tidak diterima dari server",
        };
        return;
      }
      photoLoadError.value = false;
      form.photoURL = photoURL;

      await apiFetch("/me", {
        method: "PATCH",
        body: { photoURL },
      });

      if (user.value) {
        user.value.photoURL = photoURL;
      }
    } catch (e: any) {
      const msg = e?.data?.message ?? "Gagal mengunggah foto";
      profileErrors.value = { ...profileErrors.value, photoURL: msg };
      toast.error(msg);
    } finally {
      uploadingPhoto.value = false;
      input.value = "";
    }
  }

  async function saveProfile() {
    try {
      await apiFetch("/me", {
        method: "PATCH",
        body: {
          displayName: form.displayName,
          phoneNumber: form.phoneNumber,
        },
      });
      toast.success("Profil berhasil disimpan");
    } catch (e: any) {
      const msg = e?.data?.message ?? "Gagal menyimpan profil";
      toast.error(msg);
    }
  }

  async function updatePassword() {
    if (!password.current) {
      passwordErrors.value = {
        ...passwordErrors.value,
        current: "Sandi lama wajib diisi",
      };
      return;
    }
    if (!password.new) {
      passwordErrors.value = {
        ...passwordErrors.value,
        new: "Sandi baru wajib diisi",
      };
      return;
    }
    if (password.new !== password.confirm) {
      passwordErrors.value = {
        ...passwordErrors.value,
        confirm: "Konfirmasi sandi tidak sama",
      };
      return;
    }

    try {
      await apiFetch("/auth/change-password", {
        method: "POST",
        body: {
          currentPassword: password.current,
          newPassword: password.new,
        },
      });

      toast.success("Kata sandi berhasil diperbarui");

      password.current = "";
      password.new = "";
      password.confirm = "";
    } catch (e: any) {
      const msg = e?.data?.message ?? "Gagal memperbarui kata sandi";
      toast.error(msg);
    }
  }

  async function confirmDeleteAccount() {
    if (typeof window === "undefined") return;
    if (
      !confirm(
        "Yakin ingin menghapus akun permanen? Tindakan ini tidak dapat dibatalkan.",
      )
    )
      return;
    try {
      await apiFetch("/auth/delete-account", {
        method: "DELETE",
      });

      toast.success("Akun Anda berhasil dihapus");

      await signOut();
      await navigateTo("/signin");
    } catch (e: any) {
      const msg = e?.data?.message ?? "Gagal menghapus akun";
      toast.error(msg);
    }
  }

  return {
    user,
    form,
    photoLoadError,
    password,
    passwordStrength,
    passwordStrengthLabel,
    notif,
    twoFaEnabled,
    privacy,
    profileErrors,
    passwordErrors,
    uploadingPhoto,
    onPhotoChange,
    saveProfile,
    updatePassword,
    confirmDeleteAccount,
  };
}

/**
 * State & handler untuk halaman sign-in.
 */
export function useSignInState() {
  const router = useRouter();
  const { signIn, resetPassword, loading, error, user } = useAuthContext();

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
      const role = user.value?.role;
      const targetPath = role === Role.ADMIN ? "/dashboard" : "/";
      router.push(targetPath);
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
