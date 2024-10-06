const Announcement = require("../../../models/otros/anuncio.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const deleteImage = require("../../../util/deleteImage");

const folder = "announcements/";

exports.patchAnnouncement = [
  upload.single("file"),
  uploadToS3(folder),
  async (request, response) => {
    const IDAnuncio = request.params.IDAnuncio;
    const titulo = request.body.titulo.replace(/^"|"$/g, "");
    const contenido = request.body.contenido.replace(/^"|"$/g, "");
    const imagenNueva = request.file ? request.file.filename : null;
    const imagenVieja = await Announcement.getImagen(IDAnuncio);
    var anuncio;
    try {
        if(imagenNueva === null) {
                anuncio = await Announcement.patchAnnouncement(
                IDAnuncio,
                titulo,
                contenido,
                imagenVieja
              );
        }
        else{
            anuncio = await Announcement.patchAnnouncement(
              IDAnuncio,
              titulo,
              contenido,
              imagenNueva
            );
            console.log(folder, imagenVieja);
            deleteImage(folder, imagenVieja);
        }
      return response.status(201).json(anuncio);
    } catch (error) {
      return response
        .status(404)
        .json({ message: "Anuncio no encontrado", error: error.message });
    }
  },
];