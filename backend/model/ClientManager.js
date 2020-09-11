
/**
 * This class registers all client sockets and
 * adds their information like uid, name and picture.
 */
module.exports = () => {
    const clients = new Map();

    /**
     * Adds a client to the local map
     * @param {Socket} socket client socket
     */
    const addClient = (socket) => {
        const { uid, picture, name } = socket.decoded;
        clients.set(uid, {user: {uid, picture, name}, socket});
    }

    /**
     * Removes a client in the map.
     * @param {Socket} socket client socket
     */
    const removeClient = (socket) => {
        clients.delete(socket.decoded.uid);
    }

    /**
     * Finds all users and returns them
     * @returns array of user objects
     */
    const getUsers = () => {
        return Array.from(clients.values()).map(({user, socket}) => user);
    }

    return {
        addClient,
        removeClient,
        getUsers,
    }
}
