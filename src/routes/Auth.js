import React from "react";
import { authService, firebaseInstance } from "myFirebase";
import AuthForm from "components/AuthForm";
// import { auth } from "firebase";

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
            <AuthForm />
            <div>
                <button name="google" onClick={ onSocialClick }>Continue with Google</button>
                <button name="github" onClick={ onSocialClick }>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth;