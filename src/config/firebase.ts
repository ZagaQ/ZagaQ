import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCHCG6GOgZ8KbLcEp4CbPwF2qcasbwgV98',
  authDomain: 'zagaqapp.firebaseapp.com',
  projectId: 'zagaqapp',
  storageBucket: 'zagaqapp.appspot.com',
  messagingSenderId: '1025193831953',
  appId: '1:1025193831953:web:c527ea58873b158d080bb0',
  measurementId: 'G-NH3QDBXSLM',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const store = getFirestore(app);
