import io from "socket.io-client";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Create a socket with a jwt token
 * @param {token} jwtToken user jwt token
 */
const initSocketIO = (jwtToken) => {
    if (!jwtToken) return;
    const socketIO = io(API_URL, {
        transports: ["websocket"],
        query: {
            token: jwtToken,
        },
    });
    return socketIO;
};

/**
 * Join a chat room by name
 * @param {String} chatroomName name of the chat room
 * @param {SocketOI} socket client socket
 * @param {Function} cb callback
 */
const joinRoom = (chatroomName, socket, cb) => {
    socket.emit("join", chatroomName, cb);
};

/**
 * Leave the room by name
 * @param {String} chatroomName name of the chat room
 * @param {SocketIO} socket client socket
 * @param {Function} cb callback
 */
const leaveRoom = (chatroomName, socket, cb) => {
    socket.emit("leave", chatroomName, cb);
};

/**
 * Send a message to the chatroom
 * @param {String} chatroomName name of the chat room
 * @param {Any} message A message to be sent
 * @param {Any} color A string or object that represents a color from color.js
 * @param {SocketIO} socket client socket
 * @param {Function} cb Callback
 */
const sendMessage = (chatroomName, message, color, socket, cb) => {
    socket.emit(
        "message",
        { chatroomName, message: { text: message, color: color } },
        cb
    );
};

/**
 * get all chatroom names
 * @param {SocketIO} socket client socket
 * @param {Function} cb callback
 */
const getRooms = (socket, cb) => {
    socket.emit("chatrooms", cb);
};

/**
 * Get all logged in users
 * @param {SocketIO} socket client socket
 * @param {Function} cb Callback
 */
const getUsers = (socket, cb) => {
    socket.emit("users", cb);
};

export {
    initSocketIO,
    joinRoom,
    leaveRoom,
    sendMessage,
    getRooms,
    getUsers,
};
