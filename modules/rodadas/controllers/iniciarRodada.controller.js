const Rodada = require('../models/rodada.model'); // Asegúrate de que el path sea correcto

// Controlador para actualizar la ubicación de una rodada
exports.actualizarUbicacion = async (req, res) => {
    const { idRodada } = req.params;
    const { latitud, longitud } = req.body;

    if (!latitud || !longitud) {
        return res.status(400).json({ error: 'Latitud y longitud son requeridos' });
    }

    try {
        const nuevaUbicacion = { latitud, longitud };

        // Actualizar la rodada con la nueva ubicación
        const rodadaActualizada = await Rodada.findByIdAndUpdate(
            idRodada,
            { $push: { ubicacion: nuevaUbicacion } }, // Agrega la nueva ubicación al array
            { new: true }
        );

        if (!rodadaActualizada) {
            return res.status(404).json({ error: 'Rodada no encontrada' });
        }

        return res.status(200).json({
            message: 'Ubicación actualizada correctamente',
            rodada: rodadaActualizada
        });
    } catch (error) {
        console.error('Error actualizando la ubicación:', error);
        return res.status(500).json({ error: 'Error al actualizar la ubicación' });
    }
};
