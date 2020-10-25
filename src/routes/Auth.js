import React, { useState } from "react";
import { authService, firebaseInstance } from "myFirebase";
import { auth } from "firebase";
/* 
    Auth 관리
    firebase - console - authentication - sign in method (Email, Google, Github 선택; 물론 그 외에 것을 써도 상관없음)
    - github
    github - settings - Developer settings - OAuth Apps - New OAuth App
    Homepage URL : callback URL에서 뒤 [ /__/auth/handler ] 을 빼고
    Authorization callback URL : 위에서 github를 설정 했을때 나오는 callback url 붙여넣기
    그 후 생성된 Client ID와 Client Secret을 firebase에 붙여넣기
*/
const Auth = () => {
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
            console.log(data);
        } catch(error) {
            setError(error.message);
        }
        
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const { target:{ name } } = event;
        let provider;
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider(); 
        } else if(name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider(); 
        }
        await authService.signInWithPopup(provider);
    }

    return(
        <div>
            <form onSubmit={ onSubmit }>
                <input name="email" type="text" placeholder="Email" required value={ email } onChange={ onChange } />
                <input name="password" type="password" placeholder="Password" required value={ password } onChange={ onChange } />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                { error }
            </form>
            <span onClick={ toggleAccount }>{ newAccount ? "Sign In" : "Create Account" }</span>
            <div>
                <button name="google" onClick={ onSocialClick }>Continue with Google</button>
                <button name="github" onClick={ onSocialClick }>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth;