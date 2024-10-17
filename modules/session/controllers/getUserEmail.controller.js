const {
    Usuario
} = require('../../../models/perfil/usuario.model');

/**
 * Controlador para obtener el correo electrónico de un usuario.
 * 
 * Busca un usuario en la base de datos basado en el nombre de usuario proporcionado 
 * en la consulta y devuelve su correo electrónico. 
 * 
 * - Si el nombre de usuario no se proporciona, se devuelve un error 400.
 * - Si el usuario no se encuentra, se devuelve un error 404.
 * - En caso de error en la base de datos, se devuelve un error 500.
 */
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
