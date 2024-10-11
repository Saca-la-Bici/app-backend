const Usuario = require("../../../models/perfil/usuario.model");
const deleteImage = require('../../../util/deleteImage')


exports.deleteUser = async (request, response) => {
    const firebaseUID = request.userUID.uid;
    const folder = "profile/";
    try {
        const imagen = await Usuario.getImagen(firebaseUID)
        const usuario = await Usuario.deleteUser(firebaseUID);
        deleteImage(folder, imagen);
        return response.status(204).json(usuario);
    } catch (error) {
        return response.status(404).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};