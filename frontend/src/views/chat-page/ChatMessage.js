import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import colors from "../../config/colors";

/**
 * Generates a item that represents a message
 * @param {props} param0 taking in a message, user and time
 */
const ChatMessage = ({ message, user, time }) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={user.name} src={user.picture} />
            </ListItemAvatar>
            <ListItemText
                primary={user.name}
                secondary={
                    <span
                        style={{
                            color: message.color
                                ? colors[message.color]
                                : "#ffffff",
                        }}
                    >
                        {message.text ? message.text : message}
                    </span>
                }
            />
        </ListItem>
    );
};

export default ChatMessage;
