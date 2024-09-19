const { modificarEvento } = require('../../../models/actividades/modificaActividad.model.js');

exports.postModificarActividad = async (request, response) => {
    const { id } = request.params;
    const data = request.body;

    try {
        const updatedActivity = await modificarEvento(id, data);
        response.status(201).json({ message: 'Actividad modificada exitosamente.', updatedActivity });
    } catch (error) {
        response.status(500).json({ message: 'Error al modificar la actividad', error });
    }
};
