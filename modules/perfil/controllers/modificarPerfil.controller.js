const Usuario = require('../../../models/perfil/usuario.model');


exports.patchPerfil = [
    async (request, response) => {
        const firebaseUID = request.userUID.uid;
        const username = request.body.username;
        const nombre = request.body.nombre
        const tipoSangre = request.body.tipoSangre;
        const numeroEmergencia = request.body.numeroEmergencia;

        try {
            const profile = await Usuario.patchPerfil(firebaseUID, username, nombre, tipoSangre, numeroEmergencia);
            return response.status(201).json(profile);
        } catch (error) {
            return response.status(404).json({ message: 'Error al modificar perfil', error: error.message });
        }
    }
];