import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, setConsent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { Database } from "firebase/database";

export interface FirebaseState {
  app: FirebaseApp | null;
  auth: Auth | null;
  db: Firestore | null;
  database: Database | null;
}

export const firebaseState: FirebaseState = {
  app: null,
  auth: null,
  db: null,
  database: null,
};

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;
  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    databaseURL: config.firebaseDatabaseURL,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
    measurementId: config.firebaseMeasurementId,
  };

  if (!firebaseConfig.apiKey) {
    console.warn("[firebase] NUXT_PUBLIC_FIREBASE_API_KEY is not set");
    return;
  }

  firebaseState.app = initializeApp(firebaseConfig);
  firebaseState.auth = getAuth(firebaseState.app);
  firebaseState.db = getFirestore(firebaseState.app);
  firebaseState.database = getDatabase(firebaseState.app);

  isSupported().then((yes) => {
    if (yes && firebaseState.app) {
      getAnalytics(firebaseState.app);
      setConsent({
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  });
});
