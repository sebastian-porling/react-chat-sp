const serviceAccount = require("../serviceAccountKey.json");
const admin = require('firebase-admin');
require('dotenv').config();

/**
 * Initialize firebase admin app
 */
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL
});

exports.admin = admin
