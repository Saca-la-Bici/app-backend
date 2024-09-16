const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.consultarPreguntasFrecuentes = async (req, res) => {
    try {
        const preguntas = await PreguntaFrecuente.find();
        return res.status(200).json({
            code: 200,
            msg: 'Consulta de preguntas frecuentes exitosa',
            data: preguntas
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar las preguntas frecuentes',
            data: null
        });
    }
};