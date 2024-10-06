const Taller = require('../../../models/actividades/taller.model'); 
const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');

exports.cancelarAsistencia = async (request, response) => {
    
    const actividadId = request.body.actividadId; 
    let tipo = request.body.tipo;
    let firebaseUID = request.userUID.uid; 
    
    try {
        let actividad;

        // Busca en la colección correspondiente según el tipo
        if (tipo === 'Taller') {
            actividad = await Taller.findById(actividadId);
        } else if (tipo === 'Rodada') {
            actividad = await Rodada.findById(actividadId);
        } else if (tipo === 'Evento') {
            actividad = await Evento.findById(actividadId);
        } else {
            return response.status(400).json({ message: 'Tipo de actividad no válido' });
        }

        if (!actividad) {
            return response.status(404).json({ message: 'Actividad no encontrada' });
        }

        let usuarioEncontrado = false;

        // Iterar sobre todos los elementos en 'informacion'
        for (let actividadInfo of actividad.informacion) {
            // Verificar si el usuario está inscrito
            const usuarioIndex = actividadInfo.usuariosInscritos.indexOf(firebaseUID);
            if (usuarioIndex !== -1) {
                // Cancelar la asistencia del usuario
                actividadInfo.usuariosInscritos.splice(usuarioIndex, 1);
                actividadInfo.personasInscritas -= 1;
                usuarioEncontrado = true;
                break;  // Detener la iteración si se encuentra el usuario
            }
        }

        if (!usuarioEncontrado) {
            return response.status(400).json({ message: 'El usuario no está inscrito en esta actividad' });
        }

        // Guardar los cambios en la base de datos
        await actividad.save();

        return response.status(200).json({ message: 'Tu participación ha sido cancelada exitosamente.' });
    } catch (error) {
        console.error("Error al cancelar la asistencia del usuario:", error);
        return response.status(500).json({ message: 'Error al cancelar la asistencia', error });
    }
};
