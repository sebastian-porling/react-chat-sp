
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
        chatroom.broadcastMessage({...entry})
    }

    const handleJoin = (chatroomName, cb) => {
        chatroomHandler(chatroomName)
        .then((chatroom) => {
            chatroom.addUser(client);
            handleEntry(chatroom, `joined ${chatroomName}`);
            return cb(null, chatroom.getChatHistory());
        })
        .catch(err => client.emit('join', err))
    }

    const handleLeave = (chatroomName, cb) => {
        chatroomHandler(chatroomName)
        .then(chatroom => {
            chatroom.removeUser(client);
            handleEntry(chatroom, `leaved ${chatroomName}`);
            return cb(null);
        })
        .catch(err => client.emit('leave', err))
    }

    const handleGetChatrooms = (cb) => {
        return cb(chatroomManager.getChatrooms());
    }

    const handleMessage = ({chatroomName, message}) => {
        chatroomHandler(chatroomName)
        .then(chatroom => {
            handleEntry(chatroom, message);
            cb(null);
        })
        .catch(err => client.emit('message', err));
    }

    const handleGetUsers = (cb) => {
        return cb(null, clientManager.getUsers());
    }

    const handleDisconnect =  () => {
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
