const Chatroom = require('./Chatroom');
const chatroomData = require('../config/chatrooms');

/**
 * A class that setups all available rooms.
 * It registers clients to the room.
 */
module.exports = () => {

    /**
     * Initialize all available rooms
     */
    const chatrooms = new Map(
        chatroomData.map(c => [c, Chatroom(c)])
    )

    /**
     * Removed client from all chatrooms
     * @param {Socket} socket client socket
     */
    const removeClient = (socket) => {
        chatrooms.forEach(c => c.removeUser(socket));
    }

    /**
     * Finds the chatroom by name
     * @param {String} chatroomName name of a chatroom
     * @returns chatroom | null
     */
    const getChatroomByName = (chatroomName) => {
        return chatrooms.get(chatroomName);
    }

    /**
     * Returns the chatrooms keys,
     * which are the chatroom names
     * @returns list of chatroom names
     */
    const getChatrooms = () => {
        return Array.from(chatrooms.keys());
    }

    return {
        removeClient,
        getChatroomByName,
        getChatrooms
    }
}
