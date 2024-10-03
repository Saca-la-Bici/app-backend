const Announcement = require("../../../models/otros/anuncio.model");
const { upload, uploadToS3 } = require("../../../util/uploadImage");
const { Usuario } = require("../../../models/perfil/usuario.model");

const sendNotification = require("../../../util/sendNotification");

const folder = "announcements/";

exports.postAnnouncement = [
  upload.single("file"),
  uploadToS3(folder),
  async (request, response) => {
    const firebaseUID = request.userUID.uid;
    const titulo = request.body.titulo.replace(/^"|"$/g, "");
    const contenido = request.body.contenido.replace(/^"|"$/g, "");
    const imagen = request.file ? request.file.filename : null;

    try {
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

      return response
        .status(201)
        .json({ message: "Anuncio creado exitosamente" });
    } catch (error) {
      console.error("Error in postAnnouncement:", error);
      return response
        .status(500)
        .json({ message: "Error al crear el anuncio", error: error.message });
    }
  },
];
