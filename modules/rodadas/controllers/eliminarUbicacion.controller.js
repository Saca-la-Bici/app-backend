const Rodada = require('../../../models/actividades/rodada.model');

// Controlador para eliminar el arreglo de ubicaciones de una rodada
exports.eliminarUbicacion = async (req, res) => {
    const { idRodada } = req.params;

    try {
        // Actualizar la rodada eliminando el arreglo de ubicaciones
        const rodadaActualizada = await Rodada.findByIdAndUpdate(
            idRodada,
            { $unset: { ubicacion: "" } }, // Elimina el campo 'ubicacion'
            { new: true }
        );

        if (!rodadaActualizada) {
            return res.status(404).json({ error: 'Rodada no encontrada' });
        }

        return res.status(200).json({
            message: 'Ubicación eliminada correctamente',
            rodada: rodadaActualizada
        });
    } catch (error) {
        console.error('Error al eliminar la ubicación:', error);
        return res.status(500).json({ error: 'Error al eliminar la ubicación'});
}
};