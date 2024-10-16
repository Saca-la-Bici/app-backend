const Comentario = require('../../../models/foro/comentario.model');
const Foro = require('../../../models/foro/foro.model');

exports.eliminarComentario = async (req, res) => {
    try {
        const comentarioId = req.params.id;

        // Eliminar el comentario de la colección de comentarios
        const comentarioEliminado = await Comentario.findByIdAndDelete(comentarioId);

        // Verificar si se encontró y eliminó el comentario
        if (!comentarioEliminado) {
            return res.status(404).json({
                message: 'Comentario no encontrado'
            });
        }

        // Encontrar todas las respuestas asociadas al comentario
        const respuestas = await Comentario.find({ respuestaDe: comentarioId });

        // Eliminar todas las respuestas asociadas al comentario
        await Comentario.deleteMany({ respuestaDe: comentarioId });

        // Eliminar la referencia del comentario y sus respuestas en el arreglo de comentarios del foro
        const idsAEliminar = [comentarioId, ...respuestas.map(respuesta => respuesta._id)];
        await Foro.updateOne(
            { comentarios: { $in: idsAEliminar } },
            { $pull: { comentarios: { $in: idsAEliminar } } }
        );

        return res.status(200).json({
            message: 'Comentario y sus respuestas eliminados con éxito'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el comentario',
            error: error.message
        });
    }
};