import React from "react";
import { authService, firebaseInstance } from "myFirebase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
// import { auth } from "firebase";

/* 
    Auth 관리
    firebase - console - authentication - sign in method (Email, Google, Github 선택; 물론 그 외에 것을 써도 상관없음)
    - github
    github - settings - Developer settings - OAuth Apps - New OAuth App
    Homepage URL : callback URL에서 뒤 [ /__/auth/handler ] 을 빼고
    Authorization callback URL : 위에서 github를 설정 했을때 나오는 callback url 붙여넣기
    그 후 생성된 Client ID와 Client Secret을 firebase에 붙여넣기

    firebase - console - authentication - sign in method - authorized domains(승인된 도메인)에 특정 도메인을
    추가하여 접속을 허용할 수 있음

    firebase - console - cloud firestore - rules의 작성 규칙은 아래 참조
    https://firebase.google.com/docs/rules/rules-language
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
        <div className="authContainer">
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ marginBottom: 30 }} />
            <AuthForm />
            <div className="authBtns">
                <button className="authBtn" name="google" onClick={ onSocialClick }>Continue with Google<FontAwesomeIcon icon={ faGoogle } /></button>
                <button className="authBtn" name="github" onClick={ onSocialClick }>Continue with Github<FontAwesomeIcon icon={ faGithub } /></button>
            </div>
        </div>
    );
}
export default Auth;