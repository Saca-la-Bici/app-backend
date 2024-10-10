const { Usuario } = require('../../../models/perfil/usuario.model');
const getUserImage = require("../../../util/getUserImage");

exports.get_Perfil = async (request, response) => {
  try {
  
    const firebaseUID = request.userUID.uid;
    let perfil = await Usuario.findOne({ firebaseUID });
    if (!perfil) {
      return response.status(404).json({
        message: "Perfil no encontrado",
        data: null
      });
    }

    // Obtener la URL de la imagen del perfil
    const imageProfile = perfil.imagen
    ? await getUserImage(perfil._id.toHexString(), perfil.imagen)
    : null;
    perfil.imagen = imageProfile; 
    perfil.fechaNacimiento = perfil.fechaNacimiento.toString();
    perfil.fechaRegistro = perfil.fechaRegistro.toString();
  
    return response.status(200).json(perfil);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      data: null,
      message: 'Error al obtener el perfil del usuario'
    });
  }
};
