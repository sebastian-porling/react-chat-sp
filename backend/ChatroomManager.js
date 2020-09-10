const Chatroom = require('./Chatroom');
const chatroomData = require('./config/chatrooms');

module.exports = () => {
    const chatrooms = new Map(
        chatroomData.map(c => [
            c,
            Chatroom(c)
        ])
    )

    const removeClient = (socket) => {
        chatrooms.forEach(c => c.removeUser(socket));
    }

    const getChatroomByName = (chatroomName) => {
        return chatrooms.get(chatroomName);
    }

    const getChatrooms = () => {
        return Array.from(chatrooms.keys());
    }

    return {
        removeClient,
        getChatroomByName,
        getChatrooms
    }
}
