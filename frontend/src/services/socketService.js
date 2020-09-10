import io from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL;
const initSocketIO = (uid) => {
    console.log("Creating socket on: ", API_URL);
    const socketIO = io(API_URL, {
        transports: ['websocket'],
        query: {
            token: uid,
        },
    });
    return socketIO;
}

const joinRoom = async (chatroomName, socket, cb) => {
    socket.emit('join', chatroomName, cb);

}

const leaveRoom = async (chatroomName, socket, cb) => {
    socket.emit('leave', chatroomName, cb);
}

const sendMessage = async (chatroomName, message, socket, cb) => {
    console.log(message);
    socket.emit('message', {chatroomName, message}, cb);
}

const getRooms = async (socket, cb) => {
    socket.emit('chatrooms', cb);
}

const getUsers = async (socket, cb) => {
    socket.emit('users', cb);
}

const getRoomUsers = async (socket, cb) => {
    /* TODO */
}

export {initSocketIO, joinRoom, leaveRoom, sendMessage, getRooms, getUsers, getRoomUsers}
