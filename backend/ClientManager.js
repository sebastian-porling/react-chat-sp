
module.exports = () => {
    const clients = new Map();

    const addClient = (socket) => {
        const { uid, picture, name } = socket.decoded;
        clients.set(socket.id, {user: {uid, picture, name}, socket});
    }

    const removeClient = (socket) => {
        clients.delete(socket.id);
    }

    const getUsers = () => {
        return Array.from(clients.values()).map(({user, socket}) => user);
    }

    return {
        addClient,
        removeClient,
        getUsers,
    }
}
