const Perfil = require('../../../models/perfil/usuario.model');

exports.consultarPerfil = async (request, response) => {
    try{
        const perfil = await Perfil.find();
        return response.status(200).json({
            code: 200,
            msg: 'Consulta de datos de perfil exitosa',
            data: perfil
        });
    } catch(error){
        console.error(error);
        return ressponse.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar el perfil',
            data: null
        });
    }
}
