const {
    Usuario
} = require('../models/perfil/usuario.model');

const PoseeRol = require("../models/perfil/poseeRol.model");
const Rol = require('../models/perfil/rol.model');
const Privilegio = require("../models/perfil/privilegio.model");
const ContienePrivilegio = require("../models/perfil/contienePrivilegio.model");

// Middleware para verificar el idToken
const verifyUserPermissions = async (request, response, next) => {

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

        // Sacar dependiendo del rol los id de los permisos
        const contieneID = await ContienePrivilegio.find({
            IDRol: rolID
        });

        let privilegiosRol = [];

        for (let privilegio of contieneID) {
            // Encontrar el nombre del privilegio especifico
            let privilegioNombre = await Privilegio.findOne({
                _id: privilegio.IDPrivilegio
            })

            privilegiosRol.push(privilegioNombre.nombre)
        }

        request.permisos = privilegiosRol;

        // Pasar al siguiente middleware 
        next();
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            error: error.message,
        });
    }

};

module.exports = verifyUserPermissions;