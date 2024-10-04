const Usuario = require("../../../models/perfil/usuario.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");

// Controlador para modificar el perfil (actualizar datos sin imagen)
exports.patchPerfil = async (request, response) => {
  const firebaseUID = request.userUID.uid;
  const { username, nombre, tipoSangre, numeroEmergencia } = request.body;

  try {
    const profile = await Usuario.patchPerfil(
      firebaseUID,
      username,
      nombre,
      tipoSangre,
      numeroEmergencia
    );

    return response
      .status(200)
      .json({ message: "Perfil actualizado exitosamente", profile });
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Error al modificar perfil", error: error.message });
  }
};


