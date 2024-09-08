// const admin = require('../../../util/firebase');
const Usuario = require('../../../models/perfil/usuario.model');

exports.registrarUsuario = async (request, response) => {
    try {
        // Sacar los datos body
        const {
            username,
            nombre,
            edad,
            tipoSangre, 
            correoElectronico, 
            numeroEmergencia
        } = request.body;

        // Crear el usuario en MongoDB, por ahora sin firebaseUID
        const newUser = new Usuario({
            username,
            nombre,
            edad,
            tipoSangre,
            correoElectronico,
            numeroEmergencia
            // firebaseUID: uid, // Descomentar cuando uses Firebase
        });

        await newUser.save();

        response.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });

    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
};