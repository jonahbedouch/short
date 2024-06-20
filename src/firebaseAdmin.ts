import { app } from 'firebase-admin';
import { initializeApp, getApps, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';

export function initAdmin() {
  if (getApps().length <= 0) {
    initializeApp({
      credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS as string))
    })
  }
}


// Import the functions you need from the SDKs you need

