import {useState} from "react";
import {signInAuthUserWithEmailAndPassword, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '', password: '',
};
const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };


    const signWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        console.log(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        } catch (error) {
        }
    };

    return (<div className={'sign-in-container'}>
        <h2>Already have an account</h2>
        <h1>Sign in with your email and password</h1>
        <form onSubmit={handleSubmit}>


            <label>Email</label>
            <FormInput label={"Email"} type={"email"} required name={'email'} onChange={handleChange}
                       value={email}/>

            <label>Password</label>
            <FormInput label={"Password"} type={"password"} required name={'password'} onChange={handleChange}
                       value={password}/>
            <div className={'buttons-container'}>
                <Button type={'submit'}>Sign In</Button>
                <Button buttonType="google" onClick={signWithGoogle}>Google sign in</Button></div>
        </form>
    </div>);
};

export default SignInForm;