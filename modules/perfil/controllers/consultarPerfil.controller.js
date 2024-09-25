const Usuario = require('../../../models/perfil/usuario.model');

exports.get_Perfil = async (request, response) => {
    try {
        const { firebaseUID } = request.params; 
        const perfil = await Usuario.findOne({ firebaseUID });
        return response.status(200).json({
            code: 200,
            msg: 'Consulta de datos de perfil exitosa',
            data: perfil
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar el perfil',
            data: null
        });
    }
};
