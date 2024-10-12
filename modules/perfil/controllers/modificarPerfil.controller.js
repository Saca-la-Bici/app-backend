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
    const username = request.body.username.replace(/^"|"$/g, "");
    const nombre = request.body.nombre.replace(/^"|"$/g, "");
    const tipoSangre = request.body.tipoSangre.replace(/^"|"$/g, "");
    const numeroEmergencia = request.body.numeroEmergencia.replace(/^"|"$/g, "");
    var imagenNueva = request.file ? request.file.filename : null;
    var oldImage = null
    try {
      
      if(!imagenNueva){
        imagenNueva = await Usuario.getImagen(firebaseUID);
      }
      else if(imagenNueva != null){
        oldImage = await Usuario.getImagen(firebaseUID);
      }

      const profile = await Usuario.patchPerfil(
        firebaseUID,
        imagenNueva,
        username,
        nombre,
        tipoSangre,
        numeroEmergencia
      );

      if(oldImage){
        deleteImage(folder, oldImage);
      }

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


