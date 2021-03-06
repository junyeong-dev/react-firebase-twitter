import React, { useState } from "react";
import { authService } from "myFirebase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        // reference : https://firebase.google.com/docs/reference/js/firebase.auth.Auth?hl=ko#createuserwithemailandpassword
        let data;
        try {
            if(newAccount) {
                //  name=""create account
                // 아이디를 만든 후 firebase console의 Autentication에서 확인 가능
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            // console.log(data);
        } catch(error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
        <form onSubmit={ onSubmit } className="container">
            <input className="authInput" name="email" type="text" placeholder="Email" required value={ email } onChange={ onChange } />
            <input className="authInput" name="password" type="password" placeholder="Password" required value={ password } onChange={ onChange } />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"} />
            { error && <span className="authError">{ error }</span> }
        </form>
        <span className="authSwitch" onClick={ toggleAccount }>{ newAccount ? "Sign In" : "Create Account" }</span>
        </>
    );
}

export default AuthForm;