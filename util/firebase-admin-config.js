const admin = require("firebase-admin");
const serviceAccount = require("./login-app.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
