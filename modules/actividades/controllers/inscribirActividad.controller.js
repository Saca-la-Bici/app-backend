const Taller = require('../../../models/actividades/taller.model'); 
const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');
const mongoose = require('mongoose');

exports.inscribirUsuario = async (request, response) => {
    const actividadId = request.body.actividadId; 
    let tipo = request.body.tipo;
    let firebaseUID = request.userUID.uid; 


    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(actividadId)) {
        return response.status(400).json({ message: 'ID de actividad no válido' });
    }

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

        // Verificar si el usuario ya está inscrito en cualquier parte de la lista 'informacion'
        let usuarioYaInscrito = false;
        for (let actividadInfo of actividad.informacion) {
            if (actividadInfo.usuariosInscritos.includes(firebaseUID)) {
                usuarioYaInscrito = true;
                break;  // No es necesario seguir buscando si ya encontramos al usuario
            }
        }

        if (usuarioYaInscrito) {
            return response.status(400).json({ message: 'El usuario ya está inscrito en esta actividad' });
        }

        // Inscribir al usuario en la primera posición de la lista de 'informacion'
        actividad.informacion[0].usuariosInscritos.push(firebaseUID);
        actividad.informacion[0].personasInscritas += 1;

        // Guardar los cambios en la base de datos
        await actividad.save();

        return response.status(200).json({ message: 'Tu inscripción ha sido confirmada. ¡Nos vemos pronto!' });
    } catch (error) {
        console.error("Error al inscribir usuario:", error);
        return response.status(500).json({ message: 'No se pudo completar la inscripción, por favor intenta de nuevo.', error });
    }
};
