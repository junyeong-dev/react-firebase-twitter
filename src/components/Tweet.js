import React from "react";

const Tweet = ({ tweetObj }) => {
    return (
    <div key={ tweetObj.id }>
        <h4>{ tweetObj.text }</h4>
    </div>);
};

export default Tweet;