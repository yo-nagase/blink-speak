// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import type { AppProps } from "next/app";
import { getApps } from "firebase/app";
import Head from "next/head";
import { getPerformance } from "firebase/performance";
import "bulma/css/bulma.css";

import {store} from "../store";
import { Provider } from "react-redux";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
// Check if firebase app is not already initialized
if (!getApps().length) {
  const app = initializeApp(firebaseConfig);
  // Initialize Performance Monitoring and get a reference to the service
  if (typeof window !== "undefined") {
    const perf = getPerformance(app);
    // Enable analytics. https://firebase.google.com/docs/analytics/get-started
    if ("measurementId" in firebaseConfig) getAnalytics();
  }
  
}

export default function MyApp({ Component, pageProps }: AppProps) {
  // Initialize Firebase
  //const app = initializeApp(firebaseConfig);
  //   const analytics = isSupported().then((yes) =>
  //     yes ? getAnalytics(app) : null
  //   );

  return (
    <>
      <Provider store={store}>
      <Component {...pageProps} />

      </Provider>
    </>
  );
}
