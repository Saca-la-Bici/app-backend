// Importa el modelo de anuncios y la función para eliminar imágenes
const Announcement = require('../../../models/otros/anuncio.model');
const deleteImage = require('../../../util/deleteImage');

exports.deleteAnnouncement = async (request, response) => {
    // Obtiene el ID del anuncio de los parámetros de la solicitud
    const IDAnuncio = request.params.IDAnuncio;
    // Define la carpeta de imágenes en el S3 para los anuncios
    const folder = "announcements/";
    try {
        // Obtiene la imagen del anuncio utilizando el ID
        const imagen = await Announcement.getImagen(IDAnuncio);
        // Elimina el anuncio utilizando el ID
        const anuncio = await Announcement.deleteAnnouncement(IDAnuncio);
        // Elimina la imagen del anuncio de la carpeta del S3
        deleteImage(folder, imagen);
        // Responde con un estado 204 y el anuncio eliminado en formato JSON
        return response.status(204).json(anuncio);
    } catch (error) {
        // En caso de error, responde con un estado 404 y un mensaje de error
        return response.status(404).json({ message: 'Error al eliminar el anuncio', error: error.message });
    }
};