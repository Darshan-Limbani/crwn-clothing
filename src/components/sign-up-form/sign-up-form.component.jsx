import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, {displayName});

            resetFormFields();

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.error('user creation encountered an error', error);
            }
        }
    };

    return (
        <div className={'sign-up-container'}>
            <h2>Don't have an account</h2>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput label={"Display Name"} type={"text"} required name={'displayName'} onChange={handleChange}
                           value={displayName}/>

                <FormInput label={"Email"} type={"email"} required name={'email'} onChange={handleChange}
                           value={email}/>

                <FormInput label={"Password"} type={"password"} required name={'password'} onChange={handleChange}
                           value={password}/>

                <FormInput label={"Confirm Password"} type={"password"} required name={'confirmPassword'}
                           onChange={handleChange}
                           value={confirmPassword}/>
                <Button buttonType="google" type={'submit'}>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;