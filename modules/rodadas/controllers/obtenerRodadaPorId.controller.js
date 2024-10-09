const Rodada = require('../../../models/actividades/rodada.model');

const getRodadaByActividadId = async (idActividad) => {
    try {
        // Buscar la rodada que contiene la actividad con el ID proporcionado en 'informacion'
        const rodada = await Rodada.findOne({
            'informacion._id': idActividad // Buscar dentro del array 'informacion'
        })
        .populate('ruta') // Poblar el campo 'ruta' para obtener detalles completos de la ruta
        .exec(); // Aseguramos que la consulta se ejecute correctamente

        if (!rodada) {
            return {
                message: 'Rodada no encontrada para esta actividad',
                error: true
            };
        }

        // Obtener el ID de la rodada y el ID de la ruta
        const idRodada = rodada._id;
        const idRuta = rodada.ruta ? rodada.ruta._id : null; // Validar si tiene ruta

        return {
            idRodada,
            idRuta
        };
    } catch (error) {
        console.log(`Error al obtener la rodada y la ruta: ${error.message}`);
        return {
            message: 'Error al obtener los datos',
            error: error.message
        };
    }
};

module.exports = {
    getRodadaByActividadId
};
