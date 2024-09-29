const {
    Usuario
} = require('../../../models/perfil/usuario.model');

exports.perfilCompleto = async (request, response) => {

    try {
        const usuario = await Usuario.findOne({
            firebaseUID: request.userUID.uid
        });

        if (!usuario) {
            return response.status(200).json({
                perfilRegistrado: false
            });
        }

        return response.status(200).json({
            perfilRegistrado: true
        });

    } catch (error) {
        return response.status(500).json({
            error: error.message,
        });
    }
}
