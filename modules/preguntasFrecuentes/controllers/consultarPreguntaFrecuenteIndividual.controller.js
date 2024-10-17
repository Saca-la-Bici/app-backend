const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.get_PreguntaIndividual = async (req, res) => {
    try {
        const { IdPregunta } = req.params; // Obtenemos el ID de la URL
        //Validación de que el id sea un número
        if (isNaN(IdPregunta)){
            return res.status(400).json({
                message: "Identificador de la pregunta no es un identificador",
                data: null
            })
        }
        const pregunta = await PreguntaFrecuente.findOne({ IdPregunta }); // Busca una pregunta por su IDPregunta
        if (!pregunta){
            return res.status(404).json({ mensaje: "Pregunta no encontrada", data:null})
        }
        return res.status(200).json({
            code: 200,
            msg: 'Consulta de pregunta frecuente exitosa',
            data: [pregunta]
        });
    } catch (err) {
        return res.status(500).json({
            code: 500,
            msg: 'Error de lectura, vuelva a intentarlo más tarde: ', err,
            data: null
        });
    }
};

