
/**
 * Creates a instance of a chatroom,
 * which holds chat history and users.
 * @param {String} name chatroom name
 */
module.exports = (name) => {
    const chatroomName = name;
    const users = new Map();
    let chatHistory = [];

    /**
     * Sends a message to all users in the chat room
     * @param {Any} message message to be broadcasted
     */
    const broadcastMessage = (message) => {
        users.forEach(({user, socket}) => {
            socket.emit('message', message)
        });
    }

    /**
     * Broadcasts all users in the chatroom
     * to all registered users.
     */
    const broadcastUsers = () => {
        users.forEach(({user, socket}) => {
            socket.emit('users', getUsers());
        });
    }

    /**
     * Appends a chat entry to the chat history
     * @param {Any} entry a entry to the chat history
     */
    const addEntry =  (entry) => {
        chatHistory = [...chatHistory, entry];
    }

    /**
     * Gets the chat history
     * @returns chat history array
     */
    const getChatHistory = () => {
        return chatHistory;
    }

    /**
     * Adds a user to the chat room
     * and broadcasts the users to all clients
     * @param {Socket} socket client socket
     */
    const addUser = (socket) => {
        const {uid, name, picture} = socket.decoded;
        users.set(uid, {user: socket.decoded, socket});
        broadcastUsers();
    }

    /**
     * Removes a user from the chat room
     * and broadvasts the users to all clients
     * @param {Socket} socket client socket
     */
    const removeUser = (socket) => {
        users.delete(socket.decoded.uid);
        broadcastUsers();
    }

    /**
     * Gets all users as an array
     * @returns user array
     */
    const getUsers = () => {
        return Array.from(users.values()).map(({user, socket}) => user);
    }

    return {
        broadcastMessage,
        broadcastUsers,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        getUsers,
        chatroomName
    }
}
