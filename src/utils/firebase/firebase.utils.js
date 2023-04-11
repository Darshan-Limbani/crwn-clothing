// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

import {doc, getDoc, setDoc, getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});
        } catch (error) {
            console.log('Error creating the User', error.message);
        }
    }
};