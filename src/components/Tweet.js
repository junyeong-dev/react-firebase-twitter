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
    return (
        <div>
            {editing ? (
                <>
                <form>
                    <input type="text" placeholder="Edit" value={ newTweet } required />
                    <input type="submit" value="Update Tweet"/>
                </form>
                <button onClick={ toggleEditing }>Cancle</button>
                </>
                ) : (
                <>
                    <h4>{ tweetObj.text }</h4>
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