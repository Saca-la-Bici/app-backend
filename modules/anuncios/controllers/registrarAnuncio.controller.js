
const Announcement = require('../../../models/otros/anuncio.model');
const {
    Usuario
} = require('../../../models/perfil/usuario.model');

const sendNotification = require('../../../util/sendNotification');

exports.postAnnouncement = async (request, response) => {
    const firebaseUID = request.userUID.uid;
    const titulo = request.body.titulo;
    const contenido = request.body.contenido;
    const imagen = request.body.imagen;
    try {
        await Announcement.postAnnouncement(firebaseUID, titulo, contenido, imagen);

        // Obtener todos los tokens de FCM de los usuarios
        const usuarios = await Usuario.find({
            fcmTokens: {
                $exists: true,
                $ne: []
            }
        });
        const tokens = usuarios.reduce((acc, usuario) => acc.concat(usuario.fcmTokens), []);

        // Definir el contenido de la notificación
        const tituloNotificacion = titulo;
        const cuerpoNotificacion = contenido;

        // Enviar la notificación
        await sendNotification(tokens, tituloNotificacion, cuerpoNotificacion);

        return response.status(201).json({ message: 'Anuncio creado correctamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al crear el anuncio', error: error.message });
    }
};