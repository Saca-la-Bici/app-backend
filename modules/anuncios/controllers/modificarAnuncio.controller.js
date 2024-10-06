const Announcement = require("../../../models/otros/anuncio.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const deleteImage = require("../../../util/deleteImage");

const folder = "announcements/";

exports.patchAnnouncement = [
  upload.single("file"),
  uploadToS3(folder),
  async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagenNueva = request.file ? request.file.filename : null;
    try {
      const imagenVieja = await Announcement.getImagen(IDAnuncio);
      const anuncio = await Announcement.patchAnnouncement(
        IDAnuncio,
        titulo,
        contenido,
        imagenNueva
      );
      deleteImage(folder, imagenVieja);
      return response.status(201).json(anuncio);
    } catch (error) {
      return response
        .status(404)
        .json({ message: "Anuncio no encontrado", error: error.message });
    }
  },
];