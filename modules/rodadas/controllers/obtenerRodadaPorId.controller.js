const Rodada = require('../../../models/actividades/rodada.model');

exports.getRodadaYRutaPorRodadaId = async (request, response) => {
    const { rodadaId } = request.params; // Obtener el id de la rodada desde los parámetros de la URL

    try {
        // Buscar la rodada por su ID
        const rodada = await Rodada.findById(rodadaId).populate('ruta'); // Asegúrate de tener un campo 'ruta' como referencia en tu esquema

        if (!rodada) {
            return response.status(404).json({
                message: 'No se encontró ninguna rodada con el ID proporcionado'
            });
        }

        // Obtener los IDs de la rodada y de la ruta
        const rutaId = rodada.ruta ? rodada.ruta._id : null; // Verificar si la ruta está presente

        response.status(200).json({
            rodadaId: rodada._id,
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

