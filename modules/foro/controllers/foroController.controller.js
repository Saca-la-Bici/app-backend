const Foro = require('../../../models/foro/foro.model');
const { findUserByFirebaseUID } = require('../../../models/perfil/usuario.model'); 

exports.obtenerForoPorIdDeActividad = async (request, response) => {
    try {
        // Obtener el ID de la actividad desde los parámetros de la solicitud
        const actividadId = request.params.id;

        // Usar la función consultarComentarios para obtener los comentarios del foro
        const { _id: foroId, comentarios } = await Foro.consultarComentarios(actividadId);

        // Obtener los usuarios correspondientes a los firebaseUIDs
        const comentariosConUsuarios = await Promise.all(comentarios.map(async comentario => {
            const usuario = await findUserByFirebaseUID(comentario.firebaseUID);
            return {
                ...comentario.toObject(),
                username: usuario ? usuario.username : null,
                firebaseUID: usuario ? usuario.firebaseUID : comentario.firebaseUID
            };
        }));

        // Crear la respuesta del foro con los comentarios que incluyen los usuarios
        const foroConComentarios = {
            idForo: foroId, 
            actividad: actividadId,
            comentarios: comentariosConUsuarios
        };

        // Enviar el foro encontrado como responsepuesta
        response.status(200).json(foroConComentarios);
    } catch (error) {
        // Manejar el error
        response.status(500).json({ mensaje: 'Error al obtener el foro', error: error.message });
    }
};