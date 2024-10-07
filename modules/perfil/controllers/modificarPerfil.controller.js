const Usuario = require("../../../models/perfil/usuario.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const deleteImage = require("../../../util/deleteImage");

const folder = "profile/";

// Controlador para modificar el perfil
exports.patchPerfil = [
  upload.single("file"),
  uploadToS3(folder),
  async (request, response) => {

    const firebaseUID = request.userUID.uid;
    const username = request.body.username
    const {nombre, tipoSangre, numeroEmergencia } = request.body;
    const imagenNueva = request.file ? request.file.filename : null;
    console.log(imagenNueva)
    console.log(username, nombre, tipoSangre)
    console.log("caca")

    try {
      const oldImage = await Usuario.getImagen(firebaseUID);
      const profile = await Usuario.patchPerfil(
        firebaseUID,
        imagenNueva,
        username,
        nombre,
        tipoSangre,
        numeroEmergencia
      );
      deleteImage(folder, oldImage);

      return response
        .status(200)
        .json({ message: "Perfil actualizado exitosamente", profile });
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Error al modificar perfil", error: error.message });
    }
  }
];


