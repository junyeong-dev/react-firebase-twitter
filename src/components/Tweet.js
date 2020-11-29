import React, { useState } from "react";
import { dbService, storageService } from "myFirebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
            // reference : https://firebase.google.com/docs/reference/js/firebase.storage.Storage#reffromurl
            // Firebase의 storage에 있는 파일을 지움
            await storageService.refFromURL(tweetObj.attachmentUrl).delete();
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
        <div className="tweet">
            {editing ? (
                <>
                <form className="container tweetEdit" onSubmit={ onSubmit } >
                    <input className="formInput" type="text" placeholder="Edit" value={ newTweet } onChange={ onChange } required autoFocus />
                    <input className="formBtn" type="submit" value="Update Tweet"/>
                </form>
                <button className="formBtn cancelBtn" onClick={ toggleEditing }>Cancle</button>
                </>
                ) : (
                <>
                    <h4>{ tweetObj.text }</h4>
                    { tweetObj.attachmentUrl && 
                        <img src={tweetObj.attachmentUrl} /> }
                    { isOwner && (
                        <div className="tweet_actions">
                            <span onClick={ onDeleteClick }>
                                <FontAwesomeIcon icon={ faTrash } />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>
                )

            }
        </div>
    );
};




export default Tweet;