const Taller = require('../../../models/actividades/taller.model'); // Asegúrate de que esta ruta sea correcta

exports.inscribirUsuario = async (request, response) => {
    const { actividadId, usuarioId } = request.body;
    console.log("ID de la actividad:", actividadId);
    console.log("ID del usuario:", usuarioId);

    try {
        // Buscar el taller por su ID
        const taller = await Taller.findById(actividadId);
        console.log("Taller encontrado:", taller);

        if (!taller) {
            return response.status(404).json({ message: 'Taller no encontrado' });
        }

        // Suponiendo que hay solo un objeto en 'informacion', accede a él directamente
        const actividad = taller.informacion[0];

        // Verificar si el usuario ya está inscrito
        if (actividad.usuariosInscritos.includes(usuarioId)) {
            return response.status(400).json({ message: 'El usuario ya está inscrito en esta actividad' });
        }

        // Inscribir al usuario
        actividad.usuariosInscritos.push(usuarioId);
        actividad.personasInscritas += 1;

        // Guardar los cambios en la base de datos
        await taller.save();

        return response.status(200).json({ message: 'Usuario inscrito exitosamente' });
    } catch (error) {
        console.error("Error al inscribir usuario:", error);
        return response.status(500).json({ message: 'Error al inscribir al usuario', error });
    }
};
