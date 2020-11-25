import React, { useEffect, useState } from"react";
import { authService, dbService } from "myFirebase";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
    // reference : https://reactrouter.com/web/api/Redirect
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        // Redirect
        history.push("/");
    }
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            // reference : https://firebase.google.com/docs/reference/js/firebase.User#updateprofile
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    const getMyTweets = async() => {
        // Firebase의 데이터를 필터링해서 가져옴
        // orderBy의 경우 index를 사용해야 하기 때문에 index가 아니면 console에 에러가 뜨고,
        // 그 에러의 링크를 통해 index를 만들 수 있음(물론 Firebase console에서도 만들 수 있음)
        const tweets = await dbService.
                            collection("tweets")
                            .where("creatorId", "==", userObj.uid)
                            .orderBy("createAt")
                            .get();
        console.log(tweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyTweets();
    }, []);
    return (
        <div className="container">
            <form className="profileForm" onSubmit={ onSubmit }>
                <input className="formInput" type="text" placeholder="Display name" onChange={ onChange } value={ newDisplayName } autoFocus />
                <input className="formBtn" type="submit" value="Update Profile" style={{ marginTop: 10 }}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={ onLogOutClick }> Log Out </span>
        </div>
    );

};