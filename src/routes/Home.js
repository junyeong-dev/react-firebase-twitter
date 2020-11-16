import React, { useState, useEffect } from"react";
import { dbService } from "myFirebase";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
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

    return (
    <div>
        <TweetFactory userObj={ userObj } />
        <div>
            { tweets.map((tweet) => (
                <Tweet key={ tweet.id } tweetObj={ tweet } isOwner={ tweet.creatorId === userObj.uid }/>
            ))}
        </div>
    </div>
    );
}
export default Home;