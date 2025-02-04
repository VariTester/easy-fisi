import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCSl2Rd87jQ-H3F4QfXaqIjwMInp5qqpwk",
    authDomain: "easyfisi-d215b.firebaseapp.com",
    projectId: "easyfisi-d215b",
    storageBucket: "easyfisi-d215b.firebasestorage.app",
    messagingSenderId: "191715194782",
    appId: "1:191715194782:web:054d1b9f917da5fe55c88f",
    measurementId: "G-9H3YNGXPZ1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { db, auth, storage };



