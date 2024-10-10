const mongoose = require('mongoose');
const Rodada = require('../../../models/actividades/rodada.model');

exports.getUbicacionById = async (req, res) => {
    try {
        const { idRodada } = req.params; // Asegúrate de que coincida con el nombre en la ruta

        // Verifica que sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(idRodada)) {
            return res.status(400).json({ message: 'ID de rodada no válido' });
        }

        const rodada = await Rodada.findById(idRodada).select('ubicacion');

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
