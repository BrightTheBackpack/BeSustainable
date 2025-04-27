import 'server-only'; // This is required to ensure that the code is run on the server3
import { cookies } from "next/headers";
import { initializeServerApp, initializeApp } from "firebase/app";


// Import the same config you're using in firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const getAuthenticatedAppForUser = async (authIdToken) => {
  // Initialize Firebase with the config
  const firebaseServerApp = initializeServerApp(
    initializeApp(firebaseConfig), // Pass the config here
    {
      authIdToken,
    }
  );

  try {
    const currentUser = authIdToken ? await firebaseServerApp.auth().verifyIdToken(authIdToken) : null;
    return { currentUser, firebaseServerApp };
  } catch (error) {
    console.error("Error verifying auth token:", error);
    return { currentUser: null, firebaseServerApp };
  }
};