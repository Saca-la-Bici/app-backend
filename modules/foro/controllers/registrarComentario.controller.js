const Comentario = require('../../../models/foro/comentario.model');
const Foro = require('../../../models/foro/foro.model');

exports.registrarComentario = async (request, response) => {
    try {
        const { contenido, respuestaDe } = request.body;
        const foroId = request.params.id;
        const firebaseUID = request.userUID.uid; // Obtener el firebaseUID del request
        
        // Crear el comentario
        const nuevoComentario = new Comentario({
            firebaseUID,
            contenido,
            respuestaDe: respuestaDe || null // Si es una respuesta a otro comentario
        });

        // Guardar el comentario
        const comentarioGuardado = await nuevoComentario.save();

        // Añadir el comentario al foro
        const foro = await Foro.findById(foroId);
        if (!foro) {
            return response.status(404).json({ message: 'Foro no encontrado' });
        }

        foro.comentarios.push(comentarioGuardado._id.toString());
        await foro.save();

        return response.status(201).json({
            message: 'Comentario registrado con éxito',
            comentario: comentarioGuardado
        });
    } catch (error) {
        return response.status(500).json({
            message: 'Error al registrar el comentario',
            error: error.message
        });
    }
};