const Rodada = require('../../../models/actividades/rodada.model');

const getRodadaByActividadId = async (idActividad) => {
    try {
        // Buscar la rodada que contiene la actividad con el ID proporcionado
        const rodada = await Rodada.findOne({
            'informacion._id': idActividad // Buscamos dentro del array 'informacion'
        }).populate('ruta'); // Poblar el campo 'ruta' para obtener el ID completo

        if (!rodada) {
            return {
                message: 'Rodada no encontrada para esta actividad',
                error: true
            };
        }

        // Obtener el ID de la rodada y el ID de la ruta
        const idRodada = rodada._id;
        const idRuta = rodada.ruta ? rodada.ruta._id : null; // Validamos si tiene ruta

        return {
            idRodada,
            idRuta
        };
    } catch (error) {
        console.log('Error al obtener la rodada y la ruta: ${error.message}');
        return {
            message: 'Error al obtener los datos',
            error: error.message
        };
    }
};

module.exports = {
    getRodadaByActividadId
};