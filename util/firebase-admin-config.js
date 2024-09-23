const admin = require("firebase-admin");
const serviceAccount = require("./login-app.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Exportar la instancia de admin para usar en otros archivos
module.exports = admin;
