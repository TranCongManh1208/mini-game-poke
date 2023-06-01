import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBSng4qAm-MS6BYkgTv6HLuJd2CB7FmP4E",
    authDomain: "mini-game-poke.firebaseapp.com",
    projectId: "mini-game-poke",
    storageBucket: "mini-game-poke.appspot.com",
    messagingSenderId: "847393684814",
    appId: "1:847393684814:web:e462a0e780078f2719721f",
    measurementId: "G-Y7WK0PRRJ5"
};

initializeApp(firebaseConfig);
const projectAuth = getAuth;
const projectFirestore = getFirestore;
const db = getFirestore(initializeApp(firebaseConfig));
// const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firebaseConfig, db, projectAuth, projectFirestore };
