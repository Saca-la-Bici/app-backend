const DatosPerfil = require('../../../models/perfil/consultarPerfil.model');

exports.modificarPerfil = async (req, res) => {
    try{
        const perfil = await DatosPerfil.find();
        return res.status(200).json({
            code: 200,
            msg: 'Consulta de datos de perfil exitosa',
            data: datos
        });
    } catch(error){
        console.error(error);
        return res.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar las preguntas frecuentes',
            data: null
        });
    }
}