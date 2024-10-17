// Importa el modelo de anuncios y la función para obtener la carpeta de imágenes
const Announcement = require("../../../models/otros/anuncio.model");
const getImageFolder = require("../../../util/getImageFolder");

exports.getAnnouncements = async (request, response) => {
  try {
    // Obtiene todos los anuncios en la base de datos
    const announcements = await Announcement.getAnnouncements();
    
    // Si no hay anuncios, responde con un estado 200 y un objeto JSON vacío
    if (announcements.length === 0) {
      return response.status(200).json({
        announcements: [],
        permisos: request.permisos,
      });
    }

    // Asigna los anuncios a la solicitud
    request.announcements = announcements;

    // Define la carpeta de imágenes para los anuncios
    const folder = "announcements/";

    // Obtiene las imágenes de anuncios en el S3 y las asigna a los anuncios
    announcements.imagen = await getImageFolder(request, folder);

    // Responde con un estado 200 y los anuncios en formato JSON
    return response.status(200).json({
      announcements: announcements,
      permisos: request.permisos,
    });
  } catch (error) {
    // En caso de error, imprime el error en la consola y responde con un estado 500
    console.error("Error fetching announcements:", error);
    response
      .status(500)
      .json({ message: "Error fetching announcements", error: error.message });
  }
};