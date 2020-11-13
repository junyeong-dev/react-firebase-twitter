import React, { useEffect } from"react";
import { authService, dbService } from "myFirebase";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
    // reference : https://reactrouter.com/web/api/Redirect
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        // Redirect
        history.push("/");
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
    <>
        <button onClick={ onLogOutClick }>Log Out</button>
    </>
    );

};