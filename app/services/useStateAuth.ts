import { ref, computed } from "vue";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  type Auth,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "vue-sonner";

import {
  getFirebaseAuth,
  getFirebaseDb,
  ensureFirebaseApp,
} from "@/lib/firebase";
import { Role } from "@/lib/role";

const COLLECTION_ACCOUNTS = "accounts";

function toFirestoreAccount(account: Accounts) {
  return {
    ...account,
    uid: account.id,
    photoURL: account.photoURL ?? null,
  };
}

// State global untuk auth
const user = ref<Accounts | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

let isAuthInitialized = false;

const mapFirebaseUserToAccount = (fbUser: FirebaseUser): Accounts => {
  return {
    id: fbUser.uid,
    displayName: fbUser.displayName || fbUser.email || "User",
    email: fbUser.email || "",
    phoneNumber: fbUser.phoneNumber || "",
    photoURL: fbUser.photoURL || undefined,
    role: Role.USER,
    provider:
      fbUser.providerData[0]?.providerId === "google.com" ? "google" : "email",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
};

async function fetchAccountFromFirestore(
  uid: string,
  db: ReturnType<typeof getFirebaseDb>,
): Promise<Partial<Accounts> | null> {
  if (!db) return null;
  const accountsRef = doc(db, COLLECTION_ACCOUNTS, uid);
  const snap = await getDoc(accountsRef);
  if (!snap.exists()) return null;
  const data = snap.data();
  const role = data?.role === Role.ADMIN ? Role.ADMIN : Role.USER;
  return {
    role,
    displayName: data?.displayName ?? undefined,
    phoneNumber: data?.phoneNumber ?? undefined,
    photoURL: data?.photoURL ?? undefined,
    createdAt: data?.createdAt,
    updatedAt: data?.updatedAt,
  };
}

const initAuthListener = (authInstance: Auth) => {
  if (isAuthInitialized) return;
  isAuthInitialized = true;
  loading.value = true;

  // Cek immediate: jika user sudah login dari session/cookies (synchronous check)
  const currentUser = authInstance.currentUser;
  if (currentUser) {
    // User sudah login, set langsung tanpa menunggu callback
    user.value = mapFirebaseUserToAccount(currentUser);
    loading.value = false; // Set loading false segera setelah user terdeteksi
    
    // Fetch dari Firestore di background (non-blocking)
    const db = getFirebaseDb();
    fetchAccountFromFirestore(currentUser.uid, db).then((fromFs) => {
      if (fromFs && user.value) {
        user.value = { ...user.value, ...fromFs };
      }
    }).catch(() => {
      // Silent fail, user sudah ter-set dari Firebase Auth
    });
  }

  // Setup listener untuk perubahan auth state (login/logout) dan initial state
  // onAuthStateChanged akan langsung dipanggil dengan user yang sudah login jika session masih valid
  onAuthStateChanged(authInstance, async (fbUser) => {
    if (fbUser) {
      // Set user segera (tidak perlu menunggu Firestore)
      // Ini akan override currentUser check jika onAuthStateChanged dipanggil setelah currentUser check
      user.value = mapFirebaseUserToAccount(fbUser);
      loading.value = false; // Set loading false segera setelah user terdeteksi
      
      // Fetch dari Firestore di background (non-blocking)
      const db = getFirebaseDb();
      fetchAccountFromFirestore(fbUser.uid, db).then((fromFs) => {
        if (fromFs && user.value) {
          user.value = { ...user.value, ...fromFs };
        }
      }).catch(() => {
        // Silent fail, user sudah ter-set dari Firebase Auth
      });
    } else {
      // Tidak ada user yang login
      user.value = null;
      loading.value = false;
    }
  });
};

const stubAuthContext = (): AuthContext => ({
  user,
  loading,
  error,
  signIn: async () => {},
  signUp: async () => {},
  resetPassword: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
});

/**
 * Composable utama auth: state user, loading, error, dan method signIn, signUp, signOut, dll.
 */
export function useAuthContext(): AuthContext {
  ensureFirebaseApp();
  const authInstance = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!authInstance) return stubAuthContext();

  initAuthListener(authInstance);

  const signIn = async (email: string, password: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const credential = await signInWithEmailAndPassword(
        authInstance,
        email,
        password,
      );
      user.value = mapFirebaseUserToAccount(credential.user);
      const fromFs = await fetchAccountFromFirestore(credential.user.uid, db);
      if (fromFs && user.value) {
        user.value = { ...user.value, ...fromFs };
      }
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal masuk. Silakan coba lagi.";
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
      const credential = await createUserWithEmailAndPassword(
        authInstance,
        email,
        password,
      );
      const account: Accounts = {
        id: credential.user.uid,
        displayName: name,
        email,
        phoneNumber,
        photoURL: credential.user.photoURL ?? undefined,
        role: Role.USER,
        provider: "email",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      user.value = account;
      if (db) {
        const accountsRef = doc(db, COLLECTION_ACCOUNTS, account.id);
        await setDoc(accountsRef, toFirestoreAccount(account), { merge: true });
      }
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal mendaftar. Silakan coba lagi.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await sendPasswordResetEmail(authInstance, email);
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal mengirim email reset password.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(authInstance, provider);
      const account = mapFirebaseUserToAccount(credential.user);
      user.value = account;
      if (db) {
        const accountsRef = doc(db, COLLECTION_ACCOUNTS, account.id);
        const existingSnap = await getDoc(accountsRef);
        if (existingSnap.exists()) {
          await setDoc(
            accountsRef,
            {
              displayName: account.displayName,
              email: account.email,
              phoneNumber: account.phoneNumber,
              photoURL: account.photoURL ?? null,
              provider: account.provider,
              updatedAt: Timestamp.now(),
              uid: account.id,
            },
            { merge: true },
          );
        } else {
          await setDoc(accountsRef, toFirestoreAccount(account), { merge: true });
        }
      }
      const fromFs = await fetchAccountFromFirestore(credential.user.uid, db);
      if (fromFs && user.value) {
        user.value = { ...user.value, ...fromFs };
      }
    } catch (err: unknown) {
      error.value =
        (err as { message?: string })?.message ?? "Gagal masuk dengan Google.";
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async (): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await firebaseSignOut(authInstance);
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
    signInWithGoogle,
    signOut,
  };
}

/**
 * State & handler untuk halaman sign-in.
 */
export function useSignInState() {
  const router = useRouter();
  const { signIn, signInWithGoogle, resetPassword, loading, error } =
    useAuthContext();

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

  const onGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch {
      toast.error(error.value || "Gagal masuk dengan Google.");
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
    onGoogleSignIn,
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
