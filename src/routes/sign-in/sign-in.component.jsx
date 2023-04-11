import {getRedirectResult} from 'firebase/auth';
import {useEffect} from "react";
import {
    auth,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInWithGoogleRedirect
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    useEffect(() => {
        const result = async () => {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        };
        result();
    }, []);

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const logUserRedirect = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log(user);
        // const userDocRef = await createUserDocumentFromAuth(user);
    };

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
            <button onClick={logUserRedirect}>Sign In with Google Redirect</button>
        </div>
    );
};
export default SignIn;