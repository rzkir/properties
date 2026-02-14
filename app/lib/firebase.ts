import type { FirebaseApp } from "firebase/app";

// Diisi oleh plugin client-only (app/plugins/firebase.client.ts) dari runtimeConfig.
// Di server selalu null; di client tersedia setelah plugin jalan.
import { firebaseState } from "../plugins/firebase.client";

const isClient = typeof window !== "undefined";

function ensureFirebaseApp(): FirebaseApp | null {
  if (!isClient) return null;
  return firebaseState.app;
}

// Getter: baca nilai saat dipanggil (setelah plugin mengisi state)
export function getFirebaseAuth() {
  return firebaseState.auth;
}
export function getFirebaseDb() {
  return firebaseState.db;
}

export const app = firebaseState.app;
export const auth = firebaseState.auth;
export const db = firebaseState.db;
export const database = firebaseState.database;
export const analytics = null;
export const firebaseApp = firebaseState.app;
export { firebaseState, ensureFirebaseApp };
