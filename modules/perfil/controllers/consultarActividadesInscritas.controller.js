const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');
const Taller = require('../../../models/actividades/taller.model');

exports.get_ActividadesInscritas = async (request, response) => {
    try {
        // Obtener el UID del usuario autenticado desde el request (descomentar en producción)
        const firebaseUID = request.userUID.uid;

        // Usar un UID estático para pruebas
        const ActividadesUser = [];

        // Ejecutar todas las consultas en paralelo y esperar los resultados
        const [rodadas, eventos, talleres] = await Promise.all([
            Rodada.find({ "informacion.usuariosInscritos": firebaseUID }).populate('ruta'),
            Evento.find({ "informacion.usuariosInscritos": firebaseUID }),
            Taller.find({ "informacion.usuariosInscritos": firebaseUID })
        ]);
        // Agregar las actividades encontradas al arreglo ActividadesUser
        ActividadesUser.push(...rodadas, ...eventos, ...talleres);
        // Responder con las actividades encontradas
        return response.status(200).json({
            actividadesInscritas: ActividadesUser,
            message: 'Actividades inscritas encontradas.'
        });
    } catch (error) {
        console.error("Error al obtener actividades inscritas:", error);
        return response.status(500).json({
            message: 'No se pudo obtener las actividades inscritas, por favor intenta de nuevo.',
            error: error.message
        });
    }
};
