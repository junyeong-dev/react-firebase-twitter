import React, { useState } from"react";

const Home = () => {
    const [tweet, setTweet] = useState("");
    const onSubmit = (event) => {
        event.perventDefault();
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