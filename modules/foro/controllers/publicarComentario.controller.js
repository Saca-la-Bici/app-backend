const Comentario = require('../../../models/foro/foro.model');
const Foro = require('../../../models/foro/foro.model');

exports.publicarComentario = async (request, response) => {
    const { actividadId } = request.params;
    const { username, fotoPerfil, contenido, respuestaDe } = request.body;

    try {
        const nuevoComentario = await Comentario.create({
            username,
            fotoPerfil,
            contenido,
            respuestaDe
        });
        
        await Foro.updateOne(
            { actividad: actividadId },
            { $push: { comentarios: nuevoComentario._id } }
        );

        response.status(201).json(nuevoComentario);
    } catch (error) {
        response.status(500).json({ message: 'Error al publicar el comentario', error: error.message });
    }
};