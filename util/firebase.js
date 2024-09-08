const admin = require('firebase-admin');
const path = require('./firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(require(path))
});

// Exportar la instancia de admin para usar en otros archivos
module.exports = admin;