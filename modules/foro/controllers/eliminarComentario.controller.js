const Comentario = require('../../../models/foro/comentario.model');

exports.eliminarComentario = async (request, response) => {
    const idComentario = request.params.idComentario;
   
    try {
        const comentario = await Comentario.eliminarComentario(idComentario);
        return response.status(204).json(comentario);
    } catch (error) {
        return response.status(404).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
}