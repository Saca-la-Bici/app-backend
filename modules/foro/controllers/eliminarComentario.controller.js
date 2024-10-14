const Comentario = require('../../../models/foro/foro.model');
const Foro = require('../../../models/foro/foro.model');

exports.eliminarComentario = async (req, res) => {
    const { id } = req.params; 

    try {
        const comentarioEliminado = await Comentario.findByIdAndDelete(id);
        await Foro.updateMany(
            {},
            { $pull: { comentarios: id } }  
        );

        res.status(200).json(comentarioEliminado);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
    }
};