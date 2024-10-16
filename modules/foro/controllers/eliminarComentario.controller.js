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

        // Eliminar todas las respuestas asociadas al comentario
        await Comentario.deleteMany({ respuestaDe: comentarioId });

        // Eliminar la referencia del comentario en el arreglo de comentarios del foro
        await Foro.updateOne(
            { comentarios: comentarioId },
            { $pull: { comentarios: comentarioId } }
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