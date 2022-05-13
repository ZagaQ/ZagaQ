import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxx.firebaseapp.com",
  projectId: "xxxxxxx",
  storageBucket: "xxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxx",
  appId: "x:xxxxxxxxxx:web:xxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxx"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);