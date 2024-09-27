const Usuario = require('../../../models/perfil/usuario.model');

exports.get_Perfil = async (request, response) => {
    try {
        const { firebaseUID } = request.params; 
        let perfil = await Usuario.findOne({ firebaseUID });
        perfil.fechaNacimiento = perfil.fechaNacimiento.toString()
        perfil.fechaRegistro = perfil.fechaRegistro.toString()
        return response.status(200).json(
            perfil
        );
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            data :null
        });
    }
};
