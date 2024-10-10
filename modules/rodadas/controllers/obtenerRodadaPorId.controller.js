const Rodada = require('../../../models/actividades/rodada.model');

exports.getRodadaYRutaPorActividad = async (request, response) => {
    const { actividadId } = request.params; // Obtener el id de la actividad desde los parámetros de la URL

    try {
        // Buscar la rodada que contiene la actividad específica
        const rodada = await Rodada.findOne({ 'informacion._id': actividadId }).populate('ruta');

        if (!rodada) {
            return response.status(404).json({
                message: 'No se encontró ninguna rodada con la actividad proporcionada'
            });
        }

        // Obtener los IDs de la rodada y de la ruta
        const rodadaId = rodada._id;
        const rutaId = rodada.ruta._id;

        response.status(200).json({
            rodadaId: rodadaId,
            rutaId: rutaId,
        });
    } catch (error) {
        console.error('Error al obtener la rodada y la ruta:', error.message);
        response.status(500).json({
            message: 'Error al obtener la rodada y la ruta',
            error: error.message
        });
    }
};

