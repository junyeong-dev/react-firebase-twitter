import React from "react";
import { dbService } from "myFirebase";

const Tweet = ({ tweetObj, isOwner }) => {
    const onDeleteClick = async () => {
        const checkDelete = window.confirm("Are you sure you want to delete this tweet?");
        if(checkDelete){
            // reference : https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentReference#delete
            // ['] single quotation [`] 이거 여야함
            await dbService.doc(`tweets/${ tweetObj.id }`).delete();
        }
    }
    return (
        <div key={ tweetObj.id }>
            <h4>{ tweetObj.text }</h4>
            { isOwner && (
                <>
                    <button onClick={ onDeleteClick }>Delete Tweet</button>
                    <button>Edit Tweet</button>
                </>
            )}
        </div>
    );
};

export default Tweet;