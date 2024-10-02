const Comentario = require('../../../models/foro/comentario.model');

exports.eliminarComentario = async (request, response) => {
    const idComentario = request.params.idComentario;
   
    try {
        const comentario = await Comentario.eliminarComentario(idComentario);
        
        if (!comentario) {
            return response.status(404).json({ message: 'Comentario no encontrado' });
        }
        
        return response.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
};
