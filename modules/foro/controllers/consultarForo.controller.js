const Foro = require("../../../models/foro/foro.model");

exports.getComentarios = async (request, response) => {
    const { actividadId } = request.params;

    try {
        const foro = await Foro.findOne({ actividad: actividadId }).populate('comentarios');
        response.status(200).json(foro ? foro.comentarios: []);
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
    }
};