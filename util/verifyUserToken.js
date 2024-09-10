const admin = require('./firebase-admin-config');

// Middleware para verificar el idToken
const verifyUserToken = async (request, response, next) => {

    // Extraer el token de los headers
    const idToken = request.headers.authorization?.split(' ')[1];

    if (!idToken) {
        return response.status(401).json({
            error: 'No token provided'
        });
    }

    try {
        // Verificar el token con Firebase Admin SDK
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        // Guardar el uid de Firebase del usuario en request.user
        request.userUID = {
            uid: decodedToken.uid
        }; 

        // Pasar al siguiente middleware 
        next();
    } catch (error) {
        // Regresar el error si por alguna razón el token es incorrecto
        return response.status(401).json({
            error: error,
            message: 'Invalid token'
        });
    }
};

module.exports = verifyUserToken;