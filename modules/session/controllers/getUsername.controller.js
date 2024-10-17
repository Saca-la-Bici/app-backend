const {
    Usuario
} = require('../../../models/perfil/usuario.model');

/**
 * Controlador para obtener el nombre de usuario.
 * 
 * Busca un usuario en la base de datos basado en el nombre de usuario proporcionado
 * en la consulta y devuelve si el username ya existe o no.
 * 
 * - Si el nombre de usuario no se proporciona, se devuelve un error 400.
 * - Si el usuario no se encuentra, se devuelve un mensaje de que el username está disponible.
 * - Si el usuario se encuentra, se devuelve un mensaje de que el username ya existe.
 * - En caso de error en la base de datos, se devuelve un error 500.
 */

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