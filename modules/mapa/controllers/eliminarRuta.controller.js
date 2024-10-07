const Ruta = require('../../../models/ruta/ruta.model');

exports.eliminarRuta = async (req, res) => {
    try {
        const rutaId = req.params.id.trim(); // Asume que el ID de la ruta se pasa como parámetro en la URL

        // Desactivar la ruta seleccionada
        const desactivar = {
            estatus: 0,
        };

        const rutaEliminada = await Ruta.findByIdAndUpdate(rutaId, desactivar, { new: true, overwrite: true });

        if (!rutaEliminada) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }

        res.status(200).json({ message: 'Ruta eliminada correctamente', ruta: rutaEliminada });
    } catch (error) {
        console.error('Error al eliminar la ruta:', error);
        res.status(500).json({
            message: 'Error al eliminar la ruta',
            error: error.message || error
        });
    }
};