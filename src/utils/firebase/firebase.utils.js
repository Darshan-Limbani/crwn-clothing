// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut
} from 'firebase/auth';

import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHs5ig77PISgvm3hjeOTlTBwt3sILnO_g",
    authDomain: "crwn-clothing-db-ebe71.firebaseapp.com",
    projectId: "crwn-clothing-db-ebe71",
    storageBucket: "crwn-clothing-db-ebe71.appspot.com",
    messagingSenderId: "449250318195",
    appId: "1:449250318195:web:ab7f7c8b2c7b244c771706"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) {
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log('Error creating the User', error.message);
        }
    }
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) {
        return;
    }
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) {
        return;
    }
    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);