'use client'
import React, { useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { firebaseConfig } from '@/firebase';
import { useRouter } from 'next/navigation';
import { initializeApp } from 'firebase/app';

const LoginPage = () => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;

        if (!credential) {
          return
        }

        let resp = await fetch('/api/login', {
          method: "post",
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`
          }
        })

        if (resp.status === 200) {
          router.refresh();
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-screen-2xl lg:px-24 px-2 py-4 mx-auto">
      <h1 className='text-lg font-bold'>Log in to update links</h1>
      <button onClick={signIn} className='md:w-auto w-full mt-2 p-2 bg-blue-400 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 hover:cursor-pointer rounded-lg'>Log In</button>
    </main>
  )
}

export default LoginPage