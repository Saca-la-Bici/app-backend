const { Usuario } = require("../../../models/perfil/usuario.model");
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

// Carpeta en S3 donde se guardarán las imágenes de perfil
const folder = "profile/";

// Controlador para modificar el perfil y subir la imagen
exports.put_modificarPerfil = [
  upload.single("file"), // Permite cargar un solo archivo desde el cliente
  uploadToS3(folder), // Sube el archivo a S3
  async (request, response) => {
    const { IDUsuario, Username, nombre, tipoSangre, numeroEmergencia } =
      request.body;
    const imagen = request.file ? request.file.filename : null; // La URL de la imagen en S3

    try {
      // Buscar el usuario en la base de datos
      const usuario = await Usuario.findById(IDUsuario);
      if (!usuario) {
        return response.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar los datos del usuario
      usuario.username = Username || usuario.username;
      usuario.nombre = nombre || usuario.nombre;
      usuario.tipoSangre = tipoSangre || usuario.tipoSangre;
      usuario.numeroEmergencia = numeroEmergencia || usuario.numeroEmergencia;
      if (imagen) {
        usuario.imagen = imagen; // Guardar la URL de la imagen en la base de datos
      }

      // Guardar los cambios
      await usuario.save();

      return response
        .status(200)
        .json({ message: "Perfil modificado exitosamente", usuario });
    } catch (error) {
      console.error("Error al modificar el perfil:", error);
      return response.status(500).json({
        message: "Error al modificar el perfil",
        error: error.message,
      });
    }
  },
];
