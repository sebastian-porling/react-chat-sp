const socketIO = require('socket.io');
const {handleFirebaseJwtAuthentication} = require('../middleware/firebaseJwtAuthentication');
const ClientManager = require('./ClientManager')
const ChatroomManager = require('./ChatroomManager')
const chatHandlers = require('../handlers/ChatHandlers')

const clientManager = ClientManager();
const chatroomManager = ChatroomManager();

module.exports = (server) => {
    const io = socketIO(server);

    io.use(handleFirebaseJwtAuthentication);

    io.on('connection', (socket) => {
        const {
            handleJoin,
            handleLeave,
            handleMessage,
            handleGetChatrooms,
            handleGetUsers,
            handleDisconnect,
        } = chatHandlers(socket, clientManager, chatroomManager);

        clientManager.addClient(socket);

        socket.on('join', handleJoin)
        socket.on('leave', handleLeave);
        socket.on('message', handleMessage);
        socket.on('chatrooms', handleGetChatrooms);
        socket.on('users', handleGetUsers);
        socket.on('disconnect', handleDisconnect);
        socket.on('error', function (err) {
            console.log('received error from socket:', socket.id)
            console.log(err)
        })
    });
}
