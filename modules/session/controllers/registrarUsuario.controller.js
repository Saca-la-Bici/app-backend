// const admin = require('../../../util/firebase');
const Usuario = require('../../../models/perfil/usuario.model');
const Rol = require('../../../models/perfil/rol.model');
const PoseeRol = require('../../../models/perfil/poseeRol.model'); // Modelo para la relación entre usuario y rol

exports.registrarUsuario = async (request, response) => {
    try {
        // Sacar los datos body
        const {
            username,
            nombre,
            edad,
            tipoSangre, 
            correoElectronico, 
            numeroEmergencia,
            firebaseUID
        } = request.body;

        // Buscar el rol Usuario
        const rolUsuario = await Rol.findOne({
            nombre: 'Usuario'
        });
        if (!rolUsuario) {
            return response.status(404).json({
                message: 'Rol Usuario no encontrado'
            });
        }

        // Crear el usuario en MongoDB, por ahora sin firebaseUID
        const newUser = new Usuario({
            username,
            nombre,
            edad,
            tipoSangre,
            correoElectronico,
            numeroEmergencia,
            firebaseUID 
        });

        await newUser.save();

        // Poblar la tabla Posee con la relación entre el usuario y el rol
        const poseeRol = new PoseeRol({
            // ObjectId del nuevo usuario
            IDUsuario: newUser._id, 
            // ObjectId del rol "Usuario"
            IDRol: rolUsuario._id 
        });

        // Guardar la relación en la tabla Posee
        await poseeRol.save();

        response.status(201).json({
            message: 'User registrado con éxito',
            user: newUser
        });

    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
};