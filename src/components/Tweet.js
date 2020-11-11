import React, { useState } from "react";
import { dbService } from "myFirebase";

const Tweet = ({ tweetObj, isOwner }) => {
    // 수정버튼을 눌렀는지를 확인하기 위한 state
    const [editing, setEditing] = useState(false);
    const [newTweet, setNewTweet] = useState(tweetObj.text);
    const onDeleteClick = async () => {
        const checkDelete = window.confirm("Are you sure you want to delete this tweet?");
        if(checkDelete){
            // reference : https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
            // ['] single quotation [`] 이거 여야함
            await dbService.doc(`tweets/${ tweetObj.id }`).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        // reference : https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#update
        await dbService.doc(`tweets/${ tweetObj.id }`).update({
            text: newTweet
        });
        setEditing(false);
    }
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewTweet(value);
    }
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={ onSubmit }>
                    <input type="text" placeholder="Edit" value={ newTweet } onChange={ onChange } required />
                    <input type="submit" value="Update Tweet"/>
                </form>
                <button onClick={ toggleEditing }>Cancle</button>
                </>
                ) : (
                <>
                    <h4>{ tweetObj.text }</h4>
                    { tweetObj.attachmentUrl && 
                        <img src={ tweetObj.attachmentUrl } height="50px" width="50px" /> 
                    }
                    { isOwner && (
                        <>
                            <button onClick={ onDeleteClick }>Delete Tweet</button>
                            <button onClick={ toggleEditing }>Edit Tweet</button>
                        </>
                    )}
                </>
                )

            }
        </div>
    );
};




export default Tweet;