const Taller = require('../../../models/actividades/taller.model'); 
const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');

exports.inscribirUsuario = async (request, response) => {
    const { actividadId, usuarioId, tipo } = request.body; //Se debe recibir el 'tipo' en la solicitud
    console.log("ID de la actividad:", actividadId);
    console.log("ID del usuario:", usuarioId);
    console.log("Tipo de actividad:", tipo);

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

        console.log("Actividad encontrada:", actividad);

        if (!actividad) {
            return response.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Suponiendo que hay solo un objeto en 'informacion', accede a él directamente
        const actividadInfo = actividad.informacion[0];

        // Verificar si el usuario ya está inscrito
        if (actividadInfo.usuariosInscritos.includes(usuarioId)) {
            return response.status(400).json({ message: 'El usuario ya está inscrito en esta actividad' });
        }

        // Inscribir al usuario
        actividadInfo.usuariosInscritos.push(usuarioId);
        actividadInfo.personasInscritas += 1;

        // Guardar los cambios en la base de datos
        await actividad.save();

        return response.status(200).json({ message: 'Usuario inscrito exitosamente' });
    } catch (error) {
        console.error("Error al inscribir usuario:", error);
        return response.status(500).json({ message: 'Error al inscribir al usuario', error });
    }
};
