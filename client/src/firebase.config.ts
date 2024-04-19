import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_API_KEY,
  projectId: process.env.EXPO_PUBLIC_API_KEY,
  storageBucket: process.env.EXPO_PUBLIC_API_KEY,
  messagingSenderId: process.env.EXPO_PUBLIC_API_KEY,
  appId: process.env.EXPO_PUBLIC_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
