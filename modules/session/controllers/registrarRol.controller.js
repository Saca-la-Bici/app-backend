const Rol = require('../../../models/perfil/rol.model');

exports.registrarRol = async (request, response) => {
    try {
        // Sacar los datos body
        const nombre = request.body.nombre;

        // Crear el usuario en MongoDB, por ahora sin firebaseUID
        const newRol = new Rol({
            nombre
        });

        await newRol.save();

        response.status(201).json({
            message: 'Rol registrado con éxito',
            user: newRol
        });

    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
};