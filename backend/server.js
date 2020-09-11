const express = require('express');
const app = express();
const path = require('path');
const history = require("connect-history-api-fallback");
app.use(require("cors"));
const server = require('http').createServer(app);
const {admin} = require('./integration/firebaseAdmin');
require('dotenv').config();
require('./model/socket')(server);

//staticPages = express.static(path.resolve(__dirname, "./public"));
const {CLIENT_URL} = process.env;


/**
 * Register static client
 */

if (CLIENT_URL === '') {
    app.use('/', express.static(__dirname + '/public'));
} else {
    //app.use('/', express.static(__dirname + '/public'));
    app.get('/', (req, res) => res.redirect(CLIENT_URL+'/'))
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
