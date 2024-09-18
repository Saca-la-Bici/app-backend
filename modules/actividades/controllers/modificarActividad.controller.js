const { modificarEvento } = require('../../../models/actividades/modificaActividad.model.js');

exports.postModificarActividad = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedActivity = await modificarEvento(id, data);
        res.status(201).json({ message: 'Actividad modificada exitosamente.', updatedActivity });
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar la actividad', error });
    }
};
