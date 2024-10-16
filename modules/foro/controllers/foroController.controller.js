const mongoose = require('mongoose');
const Foro = require('../../../models/foro/foro.model');

exports.obtenerForoPorIdDeActividad = async (req, res) => {
    try {
        // Obtener el ID de la actividad desde los parámetros de la solicitud
        const actividadId = req.params.id;

        // Buscar el foro que corresponde a la actividad y popular los comentarios
        const foro = await Foro.findOne({ actividad: actividadId })
                            .populate('comentarios')  // Poblar los comentarios
                            .exec();

        // Verificar si se encontró el foro
        if (!foro) {
            return res.status(404).json({ mensaje: 'No se encontró un foro para esta actividad' });
        }

        // Enviar el foro encontrado como respuesta
        res.status(200).json(foro);
    } catch (error) {
        // Manejar el error
        res.status(500).json({ mensaje: 'Error al obtener el foro', error: error.message });
    }
};