
module.exports = (client, clientManager, chatroomManager) => {

    const chatroomHandler = async (chatroomName) => {
        c = chatroomManager.getChatroomByName(chatroomName);
        if (c) return c;
        throw Error("Chatroom doesn't exist");
    }

    const handleEntry = (chatroom, entry) => {
        const {picture, name} = client.decoded;
        entry = {message: entry, user: {name, picture}, time: Date.now()};
        chatroom.addEntry(entry);
        chatroom.broadcastMessage({chatroom, ...entry})
    }

    const handleJoin = (chatroomName, cb) => {
        chatroomHandler(chatroomName)
        .then(chatroom => {
            handleEntry(chatroom, `joined ${chatroomName}`);
            chatroom.addUser(client);
            cb(null, chatroom.getChatHistory());
        })
        .catch(cb)
    }

    const handleLeave = (chatroomName, cb) => {
        chatroomHandler(chatroomName)
        .then(chatroom => {
            handleEntry(chatroom, `leaved ${chatroomName}`);
            chatroom.removeUser(client);
            cb(null);
        })
        .catch(cb)
    }

    const handleGetChatrooms = (cb) => {
        return cb(chatroomManager.getChatrooms());
    }

    const handleMessage = ({chatroomName, message}, cb) => {
        chatroomHandler(chatroomName)
        .then(chatroom => {
            handleEntry(chatroom, message);
            cb(null);
        })
        .catch(cb);
    }

    const handleGetUsers = (cb) => {
        return cb(null, clientManager.getUsers());
    }

    const handleDisconnect = () => {
        clientManager.removeClient(client);
        chatroomManager.removeClient(client);
    }

    return {
        handleJoin,
        handleLeave,
        handleGetChatrooms,
        handleMessage,
        handleGetUsers,
        handleDisconnect
    }
}
