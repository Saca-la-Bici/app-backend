// Importa el modelo de anuncios y las funciones para subir y eliminar imágenes
const Announcement = require("../../../models/otros/anuncio.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const { Usuario } = require("../../../models/perfil/usuario.model");

// Importar función para enviar notificaciones
const sendNotification = require("../../../util/sendNotification");

// Define la carpeta de imágenes para los anuncios
const folder = "announcements/";

exports.postAnnouncement = [
  // Middleware para manejar la subida de una imagen al S3
  upload.single("file"),
  uploadToS3(folder),

  async (request, response) => {
    // Obtener los parámetros de la solicitud
    const firebaseUID = request.userUID.uid;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;

    // Obtiene el nombre del archivo de la imagen si existe
    const imagen = request.file ? request.file.filename : null;

    try {
      // Crear un nuevo anuncio con los parámetros de la solicitud
      const announcement = await Announcement.postAnnouncement(
        firebaseUID,
        titulo,
        contenido,
        imagen
      );

      // Obtener todos los tokens de FCM de los usuarios
      const usuarios = await Usuario.find({
        fcmTokens: {
          $exists: true,
          $ne: [],
        },
      });
      const tokens = usuarios.reduce(
        (acc, usuario) => acc.concat(usuario.fcmTokens),
        []
      );

      // Definir el contenido de la notificación
      const tituloNotificacion = titulo;
      const cuerpoNotificacion = contenido;

      // Enviar la notificación
      await sendNotification(tokens, tituloNotificacion, cuerpoNotificacion, {
        anuncioID: announcement._id.toString(),
      });
      // Responder con un estado 201 y un mensaje de éxito
      return response
        .status(201)
        .json({ message: "Anuncio creado exitosamente" });
      // En caso de error, imprimir el error en la consola y responder con un estado 500
    } catch (error) {
      console.error("Error in postAnnouncement:", error);
      return response
        .status(500)
        .json({ message: "Error al crear el anuncio", error: error.message });
    }
  },
];
