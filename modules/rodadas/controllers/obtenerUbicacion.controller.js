const Rodada = require('../../../models/actividades/rodada.model');

exports.getUbicacionById = async (req, res) => {
    try {
        const { id } = req.params;

        const rodada = await Rodada.findById(id).select('ubicacion');

        if (!rodada) {
            return res.status(404).json({ message: 'Rodada no encontrada' });
        }

        // Devolver la ubicación de la rodada
        return res.status(200).json(rodada.ubicacion);
    } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};