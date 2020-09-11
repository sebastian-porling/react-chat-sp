const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const server = require('http').createServer(app);
require('dotenv').config();
require('./model/socket')(server);

const {CLIENT_URL} = process.env;
app.use(cors());

/**
 * Register static client
 */
if (!CLIENT_URL) {
    app.use('/', express.static(path.join(__dirname,'public')));
} else {
    app.get('/', (_, res) => res.redirect(CLIENT_URL+'/'))
}

/**
 *
 * @param {Number} port a port between 0–65 535
 */
exports.start = (port) => {
    if(0 < port && port <= 65535) {
        server.listen(port);
    }
}
