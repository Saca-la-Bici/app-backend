// Importa el modelo de anuncios y las funciones para subir y eliminar imágenes
const Announcement = require("../../../models/otros/anuncio.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const deleteImage = require("../../../util/deleteImage");

// Define la carpeta de imágenes para los anuncios
const folder = "announcements/";

exports.patchAnnouncement = [
  // Middleware para manejar la subida de una imagen al S3
  upload.single("file"),
  uploadToS3(folder),

  async (request, response) => {
    // Obtener los parámetros de la solicitud
    const IDAnuncio = request.params.IDAnuncio;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    
    // Obtiene el nombre del archivo de la nueva imagen si existe
    const imagenNueva = request.file ? request.file.filename : null;
    try {
      // Obtiene la imagen vieja del anuncio utilizando el ID
      const imagenVieja = await Announcement.getImagen(IDAnuncio);
      // Actualiza el anuncio con los nuevos datos
      const anuncio = await Announcement.patchAnnouncement(
        IDAnuncio,
        titulo,
        contenido,
        imagenNueva
      );
      // Elimina la imagen vieja de la carpeta
      deleteImage(folder, imagenVieja);
      // Responde con un estado 201 y el anuncio actualizado en formato JSON
      return response.status(201).json(anuncio);
    } catch (error) {
      // En caso de error, responde con un estado 404 y un mensaje de error
      return response
        .status(404)
        .json({ message: "Anuncio no encontrado", error: error.message });
    }
  },
];;