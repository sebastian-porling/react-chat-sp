import React from "react";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { makeStyles } from "@material-ui/core/styles";

import "./RoomUsers.css";

/**
 * Css styling
 */
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "around",
        alignItems: "center",
    },
    inline: {
        display: "inline",
    },
}));

/**
 * Generates avatars for all logged in users for a specific room
 * @param {props} param0 taking in the array of users
 */
const RoomUsers = ({ users }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h4>Users: </h4>
            <AvatarGroup max={8}>
                {users.map((user) => (
                    <Avatar key={user} alt={user.name} src={user.picture} />
                ))}
            </AvatarGroup>
        </div>
    );
};

export default RoomUsers;
