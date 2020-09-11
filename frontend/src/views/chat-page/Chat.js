import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ChatMessage from "./ChatMessage";

/**
 * Css styling
 */
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        maxHeight: "65vh",
        maxWidth: "600px",
        overflowY: "scroll",
    },
    inline: {
        display: "inline",
    },
}));

/**
 * Class displaying all messages for a given room
 * @param {props} Taking in the messages array
 */
const Chat = ({ messages }) => {
    const classes = useStyles();
    const messagesEndRef = useRef(null);

    /**
     * Scroll the chat to the bottom
     */
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    /**
     * Render all messages
     */
    return (
        <List className={classes.root}>
            {messages.map((message) => (
                <ChatMessage
                    key={message.time}
                    message={message.message}
                    user={message.user}
                    time={message.time}
                />
            ))}
            <div ref={messagesEndRef} />
        </List>
    );
};

export default Chat;
