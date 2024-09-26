const {
    Usuario
} = require('../models/perfil/usuario.model');

const PoseeRol = require("../models/perfil/poseeRol.model");
const Rol = require('../models/perfil/rol.model');

// Middleware para verificar el idToken
const verifyUserRole = async (request, response, next) => {

    try {
        const usuario = await Usuario.findOne({
            firebaseUID: request.userUID.uid
        });

        let idUsuario = usuario._id;

        const poseeID = await PoseeRol.findOne({
            IDUsuario: idUsuario
        });

        const rolID = await Rol.findOne({
            _id: poseeID.IDRol
        });

        request.rol = rolID.nombre

        // Pasar al siguiente middleware 
        next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: error.message,
        });
    }

};

module.exports = verifyUserRole;