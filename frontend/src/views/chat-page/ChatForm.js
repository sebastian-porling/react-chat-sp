import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SendIcon from "@material-ui/icons/Send";

import { sendMessage } from "../../services/socketService";
import { UserContext } from "../../providers/UserProvider";

/**
 * Css styling
 */
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        bottom: "5px",
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
        maxWidth: "600px",
        width: "96%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

/**
 * Representing a form that can send messages
 * @param {props} param0 taking in the current room and user chat color
 */
const ChatForm = ({ room, userColor }) => {
    const classes = useStyles();
    const { socket } = useContext(UserContext);
    const [message, setMessage] = useState("");

    /**
     * If message is not empty send it and reset form
     */
    const sendMessageHandler = async () => {
        if (message !== "") {
            sendMessage(room, message, userColor, socket);
            setMessage("");
        }
    };

    /**
     * Rendering the chat form
     */
    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                multiline={true}
                fullWidth={true}
                placeholder="message, like 'Hello world'"
                inputProps={{ "aria-label": 'message, like "hello world"' }}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <IconButton
                className={classes.iconButton}
                aria-label="send"
                onClick={sendMessageHandler}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default ChatForm;
