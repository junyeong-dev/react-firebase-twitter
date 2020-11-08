import React, { useState, useEffect } from"react";
import { dbService } from "myFirebase";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    // const getTweets = async() => {
    //     // reference : https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot?hl=ko
    //     // get()의 리턴 값은 QuerySnapshot
    //     const dvTweets = await dbService.collection("tweets").get();
    //     // dvTweets.forEach((document) => console.log(document.data()));
    //     dvTweets.forEach((document) => {
    //         const tweetObject = {
    //             ...document.data(),
    //             id: document.id
    //         }
    //         setTweets((prev) => [tweetObject, ...prev]);
    //     });
    // }
    useEffect(() => {
        // getTweets();
        // 실시간으로 반영하기 위한 기능
        dbService.collection("tweets").onSnapshot(snapshot => {
            // foreach보다 더 적게 re-render함
            const tweetArray = snapshot.docs.map(doc => ({ 
                id : doc.id, 
                ...doc.data(), 
            }));
            setTweets(tweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        // reference : https://firebase.google.com/docs/reference/js/firebase.firestore?hl=ko
        // FirebaseError: Missing or insufficient permissions 이 에러가 뜰 경우 
        // Cloud Firestore - Rules - allow read, write: if true -> false를 true로 변경
        await dbService.collection("tweets").add({
            text : tweet,
            createAt : Date.now(),
            creatorId : userObj.uid
        });
        setTweet("");
    }
    const onChange = (event) => {
        const { target:{ value } } = event;
        setTweet(value);
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
    }
    return (
    <div>
        <form onSubmit={ onSubmit }>
            <input type="text" placeholder="what's on your mind" maxLength={ 120 } value={ tweet } onChange={ onChange }/>
            {/* accept : 읽을 파일 종류를 선택 */}
            <input type="file" accept="image/*" onFIleChange={ onFileChange }/>
            <input type="submit" value="Tweet"/>
        </form>
        <div>
            { tweets.map((tweet) => (
                <Tweet key={ tweet.id } tweetObj={ tweet } isOwner={ tweet.creatorId === userObj.uid }/>
            ))}
        </div>
    </div>
    );
}
export default Home;