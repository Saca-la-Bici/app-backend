const Ruta = require('../../../models/ruta/ruta.model');

exports.modificarRuta = async (req, res) => {
    try {
        const rutaId = req.params.id.trim(); // Asume que el ID de la ruta se pasa como parámetro en la URL

        const rutaActualizada = {
            titulo: req.body.titulo,
            distancia: req.body.distancia,
            tiempo: req.body.tiempo,
            nivel: req.body.nivel,
            lugar: req.body.lugar,
            descanso: req.body.descanso,
            coordenadas: req.body.coordenadas,
        };

        // Actualiza la ruta existente
        const rutaModificada = await Ruta.findByIdAndUpdate(rutaId, rutaActualizada, { new: true, overwrite: true });

        if (!rutaModificada) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }

        res.status(200).json(rutaModificada);
    } catch (error) {
        console.error('Error al modificar la ruta:', error);
        res.status(500).json({
            message: 'Error al modificar la ruta',
            error: error.message || error
        });
    }
};
