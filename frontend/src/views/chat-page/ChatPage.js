import React, { useState, useContext, useEffect } from "react";

import LogoutButton from "../LogoutButton";
import RoomSwitcher from "./RoomSwitcher";
import RoomUsers from "./RoomUsers";
import UserColorSelector from "./UserColorSelector";
import ChatForm from "./ChatForm";
import Chat from "./Chat";

import { UserContext } from "../../providers/UserProvider";
import { joinRoom, leaveRoom } from "../../services/socketService";
import AuthService from "../../services/authService";

const ChatPage = () => {
    const { socket } = useContext(UserContext);
    const [room, setRoom] = useState("");
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [userColor, setUserColor] = useState("white");

    /**
     * Setup eventlisteners for messages and users.
     * Get the current users chat color
     * And setup the window to leave the room when quitting
     */
    useEffect(() => {
        socket.on("message", (message) => {
            updateMessages(message);
        });
        socket.on("users", (newUsers) => {
            updateUsers(newUsers);
        });
        AuthService.getUserColor(({ color }) => {
            setUserColor(color);
        });
        window.onbeforeunload = () => {
            leaveRoom(room, socket, () => {});
            socket.off();
        };
    }, []);

    /**
     * Change the room
     * @param {String} newRoom chat room name
     */
    const changeRoom = async (newRoom) => {
        if (room === "") {
            handleJoinRoom(newRoom);
        } else {
            leaveRoom(room, socket, async (err) => {
                if (err) console.log(err);
                handleJoinRoom(newRoom);
            });
        }
    };

    /**
     * Join a new room and change the room state
     * and messages for that room.
     * @param {String} newRoom name of chat room
     */
    const handleJoinRoom = async (newRoom) => {
        joinRoom(newRoom, socket, (err, chat) =>{
            if (err) console.log(err);
            setMessages(chat);
            setRoom(newRoom);
            return;
        });
    }

    /**
     * Append messages to the message state
     * @param {Array} message array of messages
     */
    const updateMessages = (message) => {
        if (message.message) {
            setMessages((messages) => [...messages, message]);
        }
    };

    /**
     * Updates the users state
     * @param {Array} newUsers array of users
     */
    const updateUsers = (newUsers) => {
        setUsers(newUsers);
    };

    /**
     * Changes the color of the current user, in state and firebase
     * @param {String} newUserColor color string from color.js
     */
    const changeUserColor = (newUserColor) => {
        setUserColor(newUserColor);
        AuthService.changeUserColor(newUserColor);
    };

    /**
     * Render ChatPage
     * Using RoomSwitcher for changing rooms,
     * UserColorSelector for changing color,
     * LogoutButton
     * Chat for displaying messages
     * RoomUsers for displaying logged in users in chat room
     * ChatForm for sending messages
     */
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: "600px", width: "100%" }}>
                <RoomSwitcher room={room} changeRoom={changeRoom} />
                <UserColorSelector
                    color={userColor}
                    changeColor={changeUserColor}
                />
                <LogoutButton />
                <RoomUsers users={users} />
                <Chat room={room} messages={messages} />
                <ChatForm room={room} userColor={userColor} />
            </div>
        </div>
    );
};

export default ChatPage;
