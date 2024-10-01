const {
    Usuario
} = require('../../../models/perfil/usuario.model');

exports.getUserEmail = async (request, response) => { 
    const username = request.query.username;

    if (!username) {
        return response.status(400).json({
            error: 'El nombre de usuario es obligatorio'
        });
    }

    try {
        // Busca el usuario en la base de datos
        const user = await Usuario.findOne({
            username: username
        });

        if (user) {
            return response.status(200).json({
                correoElectronico: user.correoElectronico
            });
        } else {
            return response.status(404).json({
                error: 'Usuario no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al obtener el correo electrónico:', error);
        return response.status(500).json({
            error: 'Error interno del servidor'
        });
    }
}
