const Comentario = require('../../../models/foro/comentario.model');

exports.modificarComentario = async (req, res) => {
    try {
        const contenido = req.body.contenido;
        const comentarioId = req.params.id;
        
        // Crear el comentario
        const nuevoComentario = await Comentario.modificarComentario(comentarioId, contenido);

        // Guardar el comentario
        const comentarioGuardado = await nuevoComentario.save();

        // Añadir el comentario al foro
        // const foro = await Foro.findById(foroId);
        // if (!foro) {
        //     return res.status(404).json({ message: 'Foro no encontrado' });
        // }

        return res.status(201).json({
            message: 'Comentario registrado con éxito',
            comentario: comentarioGuardado
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error al registrar el comentario',
            error: error.message
        });
    }
};

