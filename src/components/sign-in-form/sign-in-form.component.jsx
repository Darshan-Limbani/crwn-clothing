import {useState} from "react";
import {useDispatch} from "react-redux";
import {googleSignInStart} from "../../store/user/user.action";
import {signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '', password: '',
};
const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const dispatch = useDispatch();


    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (<div className={'sign-in-container'}>
        <h2>Already have an account</h2>
        <h1>Sign in with your email and password</h1>
        <form onSubmit={handleSubmit}>

            <FormInput label={"Email"} type={"email"} required name={'email'} onChange={handleChange}
                       value={email}/>

            <FormInput label={"Password"} type={"password"} required name={'password'} onChange={handleChange}
                       value={password}/>
            <div className={'buttons-container'}>
                <Button type={'submit'}>Sign In</Button>
                <Button type={'button'} buttonType={BUTTON_TYPE_CLASSES.google} onClick={signWithGoogle}>Google sign
                    in</Button></div>
        </form>
    </div>);
};

export default SignInForm;