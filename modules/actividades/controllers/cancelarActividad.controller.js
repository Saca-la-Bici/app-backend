const Actividad = require('../../../models/actividades/actividad.model');

exports.cancelarInscripcionUsuario = async (request, response) => {
    const { actividadId, usuarioId } = request.body;

    try {
        // Buscar la actividad por su ID
        const actividad = await Actividad.findById(actividadId);

        if (!actividad) {
            return response.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Verificar si el usuario está inscrito
        const usuarioIndex = actividad.usuariosInscritos.indexOf(usuarioId);
        if (usuarioIndex === -1) {
            return response.status(400).json({ message: 'El usuario no está inscrito en esta actividad' });
        }

        // Cancelar la inscripción (eliminar al usuario de la lista)
        actividad.usuariosInscritos.splice(usuarioIndex, 1);
        actividad.personasInscritas -= 1;

        // Guardar los cambios en la base de datos
        await actividad.save();

        return response.status(200).json({ message: 'Inscripción cancelada exitosamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al cancelar la inscripción', error });
    }
};
