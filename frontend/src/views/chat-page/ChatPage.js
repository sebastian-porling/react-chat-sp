import React, { useState, useContext} from 'react';
import LogoutButton from '../LogoutButton';
import RoomSwitcher from './RoomSwitcher';
import UserSettings from './UserSettings';
import ChatForm from './ChatForm';
import Chat from './Chat';
import {UserContext} from '../../providers/UserProvider'
import {joinRoom, leaveRoom} from '../../services/socketService'

const ChatPage = () => {
    const { socket} = useContext(UserContext);
    const [room, setRoom] = useState('');
    const [messages, setMessages] = useState([]);
    const [userSettings, setUserSettings] = useState(null);

    const changeRoom = (newRoom) => {
        if (room === '') {
            joinRoom(newRoom, socket, async (err, messages) => {
                if (err) console.log(err);
                setMessages(messages);
                setRoom(newRoom);
            })
        }
        leaveRoom(room, socket, async  (err) => {
            if (err !== null) console.log(err);
            joinRoom(newRoom, socket, async (err, messages) => {
                if (err !== null) console.log(err);
                console.log(messages);
                setMessages(messages);
                setRoom(newRoom);
            })
        })
    }
    socket.on('message', async (message) => {
        setMessages([...messages, message]);
    })
    const changeUserSettings = (newUserSettings) => {
        setUserSettings(newUserSettings);
    }

    return (
        <div>
            <RoomSwitcher room={room} changeRoom={changeRoom}/>
            <LogoutButton/>
            <UserSettings userSettings={userSettings} changeUserSettings={changeUserSettings}/>
            <Chat room={room} messages={messages}/>
            <ChatForm room={room} userSettings={userSettings}/>
        </div>
    )
}

export default ChatPage
