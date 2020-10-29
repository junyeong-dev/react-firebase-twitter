import React, { useState } from"react";
import { dbService } from "myFirebase";

const Home = () => {
    const [tweet, setTweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        // reference : https://firebase.google.com/docs/reference/js/firebase.firestore?hl=ko
        // FirebaseError: Missing or insufficient permissions 이 에러가 뜰 경우 
        // Cloud Firestore - Rules - allow read, write: if true -> false를 true로 변경
        await dbService.collection("tweets").add({
            tweet,
            createAt : Date.now()
        });
        setTweet("");
    }
    const onChange= (event) => {
        const { target:{ value }} = event;
        setTweet(value);
    }
    return (
    <div>
        <form onSubmit={ onSubmit }>
            <input type="text" placeholder="what's on your mind" maxLength={ 120 } value={ tweet } onChange={ onChange }/>
            <input type="submit" value="Tweet"/>
        </form>
    </div>
    );
}
export default Home;