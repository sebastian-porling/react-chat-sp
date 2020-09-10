module.exports = (name) => {
    const users = new Map();
    let chatHistory = [];

    const broadcastMessage = (message) => {
        users.forEach(({user, socket}) => socket.emit('message', message));
    }

    const addEntry = (entry) => {
        chatHistory = [...chatHistory, entry];
    }

    const getChatHistory = () => {
        return chatHistory;
    }

    const addUser = (socket) => {
        users.set(socket.id, {user: socket.decoded, socket});
    }

    const removeUser = (socket) => {
        users.delete(socket.id);
    }

    const getUsers = () => {
        return Arrays.from(users.values()).map(({user, socket}) => user);
    }

    return {
        broadcastMessage,
        addEntry,
        getChatHistory,
        addUser,
        removeUser,
        getUsers
    }
}
