const Usuario = require('../../../models/perfil/usuario.model');

exports.getUsername = async (request, response) => {
    try {
        // Obtener el username desde los parámetros de consulta (query params)
        const {
            username
        } = request.query;

        // Buscar en la base de datos si el username ya existe
        const usuario = await Usuario.findOne({
            username: username
        });

        if (usuario) {
            // Si se encuentra un usuario con ese username
            return response.status(200).json({
                usernameExistente: true,
                mensaje: "El username ya existe"
            });
        } else {
            // Si no se encuentra ningún usuario con ese username
            return response.status(200).json({
                usernameExistente: false,
                mensaje: "El username está disponible"
            });
        }

    } catch (error) {
        return response.status(500).json({
            error: error.message
        });
    }
}