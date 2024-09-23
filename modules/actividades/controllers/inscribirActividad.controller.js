const Actividad = require('../../../models/actividades/actividad.model');

exports.inscribirUsuario = async (request, response) => {
    const { actividadId, usuarioId } = request.body;

    try {
        // Buscar la actividad por su ID
        const actividad = await Actividad.findById(actividadId);

        if (!actividad) {
            return response.status(404).json({ message: 'Actividad no encontrada' });
        }

        // Verificar si el usuario ya está inscrito
        if (actividad.usuariosInscritos.includes(usuarioId)) {
            return response.status(400).json({ message: 'El usuario ya está inscrito en esta actividad' });
        }

        // Inscribir al usuario
        actividad.usuariosInscritos.push(usuarioId);
        actividad.personasInscritas += 1;

        // Guardar los cambios en la base de datos
        await actividad.save();

        return response.status(200).json({ message: 'Usuario inscrito exitosamente' });
    } catch (error) {
        return response.status(500).json({ message: 'Error al inscribir al usuario', error });
    }
};
