const Perfil = require('../../../models/perfil/perfil.model');


exports.putPerfil = async (request, response) => {
    const IDUsuario = request.body.IDUsuario;
    const Username = request.body.Username;
    const nombre = request.body.nombre
    const tipoSangre = request.body.tipoSangre;
    const numeroEmergencia = request.body.numeroEmergencia;

    try {
        const profile = await Perfil.putPerfil(IDUsuario, Username, nombre, tipoSangre, numeroEmergencia);
        return response.status(201).json(profile);
    } catch (error) {
        return response.status(404).json({ message: 'Error al modificar el perfil', error: error.message });
    }
}



