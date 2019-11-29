import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import './index.css'; // imports a css file into a JavaScript file.
/* Behind the scenes, when webpack builds our app, it sees this CSS imoprt
    and learns that index.js depends on index.css. Webpack reads the CSS file
    and includes it in the bundled JavaScript (as a string) to be sent to
    the browser. It creates a <style> tag in the HTML <head> section with the
    coordinating CSS rules. */

function Tweet({ tweet }) {
    return(
        <div className="tweet"> {/* Creates a div w/ classname attribute of 'tweet'. */}
            <Avatar hash={tweet.gravatar}/>
            <div className="content">
                <Author author={tweet.author}/><Time time={tweet.timestamp}/>
                <Message text={tweet.message}/>
                <div className="buttons">
                    <ReplyButton/>
                    <RetweetButton count={tweet.retweets}/>
                    <LikeButton count={tweet.likes}/>
                    <MoreOptionsButton/>
                </div>
            </div>
        </div>
    );
}

const Avatar = ({ hash }) => {
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return(
        <img src={url}
        className="avatar"
        alt="avatar"/>
    );
}

const Message = ({ text }) => {
    return(
        <div className="message">
            {text}
        </div>
    );
}

const Author = ({ author }) => {
    const { name, handle } = author;
    return(
        <span className="author">
            <span className="name">{name}</span>
            <span className="handle">@{handle}</span>
        </span>
    );
}

// The functions below work similarly, but are written using ES6 Arrow Syntax.
/* Notice how there's no reutrn in the last couple versions: When an arrow
    function only contains one expression, it can be written without braces.
    And when it's written without braces, the single expression is implicitly
    returned.
*/

const Time = ({ time }) => {
    const timeString = moment(time).fromNow();
    return(
        <span className="time">
            {timeString}
        </span>
    );
};

const ReplyButton = () => (
    <i className="fa fa-reply reply-button"/>
);

const RetweetButton = ({ count }) => {
    return(
        <span className="retweet-button">
            <i className="fa fa-retweet"/>
            {getRetweetCount(count)}
        </span>
    );
};

const LikeButton = ({ count }) => {
    return(
        <span className="like-button">
            <i className="fa fa-heart"/>
            {count > 0 &&
                <span className="like-count">
                    {count}
                </span>}
        </span>
    );
};

const MoreOptionsButton = () => (
    <i className="fa fa-ellipsis-h more-options-button"/>
);

const testTweet = {
    message: "Something about cats.",
    gravatar: "xyz",
    author: {
        handle: "catperson",
        name: "IAMA Cat Person"
    },
    likes: 2,
    retweets: 6,
    timestamp: "2016-07-30 21:24:37"
};

const getRetweetCount = (count) => {
    if(count > 0) {
        return(
                <span className="retweet-count">
                    {count}
                </span>
            );
    } else {
        return null;
    }
};

ReactDOM.render(<Tweet tweet={testTweet}/>, document.getElementById('root'));