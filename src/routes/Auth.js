import React from "react";
/* 
    Auth 관리
    firebase - console - authentication - sign in method (Email, Google, Github 선택; 물론 그 외에 것을 써도 상관없음)
    - github
    github - settings - Developer settings - OAuth Apps - New OAuth App
    Homepage URL : callback URL에서 뒤 [ /__/auth/handler ] 을 빼고
    Authorization callback URL : 위에서 github를 설정 했을때 나오는 callback url 붙여넣기
    그 후 생성된 Client ID와 Client Secret을 firebase에 붙여넣기
*/
const Auth = () => (
    <div>
        <form>
            <input type="text" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="submit" value="Log In" />
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>
);
export default Auth;