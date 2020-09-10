const admin = require('firebase-admin');
require('dotenv').config();
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

exports.admin = admin
