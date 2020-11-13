import React, { useState, useEffect } from"react";
import { dbService, storageService } from "myFirebase";
import Tweet from "components/Tweet";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const [tweet, setTweet] = useState("");
    const [tweets, setTweets] = useState([]);
    const [attachment, setAttachment] = useState("");
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
        let attachmentUrl = "";
        // console.log(attachment);
        if(attachment !== ""){
            // reference : https://firebase.google.com/docs/reference/js/firebase.storage.Reference?hl=ko
            // collection과 비슷함
            // uuid : 특별한 식별자를 랜덤으로 생성해줌
            const attachmentRef = storageService.ref().child(`${ userObj.uid }/${ uuidv4() }`);
            // upload 한 것은 Firebase console - Storage에서 확인 가능
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        };
        // reference : https://firebase.google.com/docs/reference/js/firebase.firestore?hl=ko
        // FirebaseError: Missing or insufficient permissions 이 에러가 뜰 경우 
        // Cloud Firestore - Rules - allow read, write: if true -> false를 true로 변경
        const tweetObj = {
            text : tweet,
            createAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        };
        await dbService.collection("tweets").add(tweetObj);
        setTweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const { target:{ value } } = event;
        setTweet(value);
    }
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const theFile = files[0];
        // reference : https://developer.mozilla.org/ko/docs/Web/API/FileReader
        // reference : https://w3c.github.io/FileAPI/#FileReader-interface
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result } } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment(null);
    }
    return (
    <div>
        <form onSubmit={ onSubmit }>
            <input type="text" placeholder="what's on your mind" maxLength={ 120 } value={ tweet } onChange={ onChange }/>
            {/* accept : 읽을 파일 종류를 선택 */}
            <input type="file" accept="image/*" onChange={ onFileChange }/>
            <input type="submit" value="Tweet"/>
            { attachment && 
                <div>
                    <img src={ attachment } width="50px" height="50px" />
                    <button onClick={ onClearAttachment }>Clear</button>
                </div> }
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