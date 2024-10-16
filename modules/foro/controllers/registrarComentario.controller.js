const Comentario = require('../../../models/foro/comentario.model');
const Foro = require('../../../models/foro/foro.model');

exports.registrarComentario = async (req, res) => {
    try {
        const {username, contenido, respuestaDe} = req.body;
        const foroId = req.params.id;
        
        // Crear el comentario
        const nuevoComentario = new Comentario({
            username,
            contenido,
            respuestaDe: respuestaDe || null // Si es una respuesta a otro comentario
        });

        // Guardar el comentario
        const comentarioGuardado = await nuevoComentario.save();

        // Añadir el comentario al foro
        const foro = await Foro.findById(foroId);
        if (!foro) {
            return res.status(404).json({ message: 'Foro no encontrado' });
        }

        foro.comentarios.push(comentarioGuardado._id.toString());
        await foro.save();

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

