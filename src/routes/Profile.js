import React from"react";
import { authService } from "myFirebase";
import { useHistory } from "react-router-dom";

export default () => {
    // reference : https://reactrouter.com/web/api/Redirect
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        // Redirect
        history.push("/");
    }
    return (
    <>
        <button onClick={ onLogOutClick }>Log Out</button>
    </>
    );

};