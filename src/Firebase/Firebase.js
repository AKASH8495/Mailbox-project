import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDEeJCnvtGFSG0RnxITO1vilgQQ0mXf_Eo",
  authDomain: "mailbox-client-project.firebaseapp.com",
  projectId: "mailbox-client-project",
  storageBucket: "mailbox-client-project.appspot.com",
  messagingSenderId: "638381428229",
  appId: "1:638381428229:web:50d76499aa9c71dd88966c"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
});

export {app, auth, currentUser};