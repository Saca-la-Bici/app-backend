const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.registrarPreguntaFrecuente = async (req, res) => {
    try {
        const { IDPregunta, Pregunta, Respuesta, Tema, Imagen } = req.body;
        const nuevaPregunta = new PreguntaFrecuente({
            IDPregunta,
            Pregunta,
            Respuesta,
            Tema,
            Imagen
        });
        await nuevaPregunta.save();
        return res.status(200).json({
            code: 200,
            msg: 'La pregunta ha sido registrada con éxito',
            data: nuevaPregunta
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            msg: 'Error al intentar registrar la pregunta',
            data: null
        });
    }
};