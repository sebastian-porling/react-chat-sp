const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const {admin} = require('./firebaseAdmin');
require('dotenv').config();

const ClientManager = require('./ClientManager')
const ChatroomManager = require('./ChatroomManager')
const chatHandlers = require('./ChatHandlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

const {CLIENT_URL} = process.env;

if (CLIENT_URL === '') {
    app.use('/', express.static(__dirname + '/public'));
} else {
    app.get('/', (req, res) => res.redirect(CLIENT_URL+'/'))
}

const store = {
    users: {},
    sockets: {}
}

const handleFirebaseJwtAuthentication = (socket, next) => {
    try {
        if (socket.handshake.query && socket.handshake.query.token) {
            admin.auth().verifyIdToken(socket.handshake.query.token)
            .then((decodedToken) => {
                socket.decoded = decodedToken;
                next();
            })
            .catch((err) => {
                next(new Error('Authentication error', err))
            });
        }
    } catch (error) {
        console.log(error);
        next(new Error('Authentication error', error));
    }

}


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
    socket.emit('users', clientManager.getUsers())
    socket.on('join', handleJoin)
    socket.on('leave', handleLeave);
    socket.on('message', handleMessage);
    socket.on('chatrooms', handleGetChatrooms);
    socket.on('get-users', handleGetUsers);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', function (err) {
        console.log('received error from socket:', socket.id)
        console.log(err)
    })

      /*

    if (!store.users[uid]) store.users[uid] = {name, picture};
    store.users[uid].presence = 'online';

    if (!store.sockets[uid]) store.sockets[uid] = {};
    store.sockets[uid][socket.id] = true;

    io.emit('users', { data: store.users });

    socket.on('disconnect', () => {
        delete store.sockets[uid][socket.id];
        if (store.users[uid]) {
            store.users[uid].presence = (Object.keys(store.sockets[uid]).length > 0) ? 'online' : 'offline';
        }
        io.emit('users', { data: store.users });
    })*/
});

exports.start= (port) => {
    server.listen(3030);
}

