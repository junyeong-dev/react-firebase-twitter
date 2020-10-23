import React, { useState } from "react";
import { authService } from "myFirebase";
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
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(error) {
            console.log(error);
        }
        
    }
    return(
        <div>
            <form onSubmit={ onSubmit }>
                <input name="email" type="text" placeholder="Email" required value={ email } onChange={ onChange } />
                <input name="password" type="password" placeholder="Password" required value={ password } onChange={ onChange } />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth;