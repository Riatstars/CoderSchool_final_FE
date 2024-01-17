import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAICApOCHEkNs2ba50J7-frtqojebkTyh4",
  authDomain: "react-js-blog-website-ce8d0.firebaseapp.com",
  projectId: "react-js-blog-website-ce8d0",
  storageBucket: "react-js-blog-website-ce8d0.appspot.com",
  messagingSenderId: "574742347937",
  appId: "1:574742347937:web:bf7f31b3ca57b59d1f30e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//google auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
