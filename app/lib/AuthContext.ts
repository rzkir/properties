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
import { doc, setDoc, Timestamp } from "firebase/firestore";

import {
  getFirebaseAuth,
  getFirebaseDb,
  ensureFirebaseApp,
} from "@/lib/firebase";

import { Role } from "@/lib/role";

const COLLECTION_ACCOUNTS = "accounts";

/** Data account yang aman untuk Firestore (tanpa undefined, pakai null untuk kosong). */
function toFirestoreAccount(account: Accounts) {
  return {
    ...account,
    photoURL: account.photoURL ?? null,
  };
}

// State global sederhana untuk auth context
const user = ref<Accounts | null>(null);
const loading = ref<boolean>(false);
const error = ref<string | null>(null);

let isAuthInitialized = false;

/**
 * Helper untuk mapping FirebaseUser ke interface Accounts.
 */
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

/**
 * Inisialisasi listener auth state agar user tetap sinkron dengan Firebase.
 * Hanya berjalan di client ketika Firebase auth sudah tersedia.
 */
const initAuthListener = (authInstance: Auth) => {
  if (isAuthInitialized) return;
  isAuthInitialized = true;

  loading.value = true;

  onAuthStateChanged(authInstance, (fbUser) => {
    if (fbUser) {
      user.value = mapFirebaseUserToAccount(fbUser);
    } else {
      user.value = null;
    }
    loading.value = false;
  });
};

/**
 * Stub context ketika Firebase belum tersedia (mis. saat SSR).
 */
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
 * Composable utama untuk digunakan di komponen:
 *
 * const auth = useAuthContext()
 * await auth.signIn(email, password)
 */
export const useAuthContext = (): AuthContext => {
  ensureFirebaseApp();
  const authInstance = getFirebaseAuth();
  const db = getFirebaseDb();
  if (!authInstance) return stubAuthContext();

  initAuthListener(authInstance);

  const hasError = computed(() => error.value !== null);

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
    } catch (err: any) {
      error.value = err?.message ?? "Gagal masuk. Silakan coba lagi.";
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

      // Mapping user baru ke Accounts
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
    } catch (err: any) {
      error.value = err?.message ?? "Gagal mendaftar. Silakan coba lagi.";
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
    } catch (err: any) {
      error.value = err?.message ?? "Gagal mengirim email reset password.";
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
        await setDoc(accountsRef, toFirestoreAccount(account), { merge: true });
      }
    } catch (err: any) {
      error.value = err?.message ?? "Gagal masuk dengan Google.";
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
    } catch (err: any) {
      error.value = err?.message ?? "Gagal keluar.";
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
};
