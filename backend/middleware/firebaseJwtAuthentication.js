const {admin} = require('../integration/firebaseAdmin');

/**
 * Checks if the socket has a jwt token and
 * authorizes it using firebase.
 * @param {Socket} socket client socket
 * @param {Function} next the function that calls the next handler
 */
module.exports.handleFirebaseJwtAuthentication = (socket, next) => {
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
        next(new Error('Authentication error', error));
    }
}
