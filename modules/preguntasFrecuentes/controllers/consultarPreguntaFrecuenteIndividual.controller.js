const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.get_PreguntaIndividual = async (req, res) => {
    try {
        const { IdPregunta } = req.params; // Obtenemos el ID de la URL
        const pregunta = await PreguntaFrecuente.findOne({ IdPregunta }); // Busca una pregunta por su IDPregunta
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

exports.put_modificarPreguntaFrecuente = async (req,res) => {
        const {IdPregunta} = req.params;
        const {Pregunta, Respuesta, Tema, Imagen} = req.body;

        try{
            const PreguntaActualizada = await PreguntaFrecuente.findOneAndUpdate({IdPregunta:IdPregunta},{Pregunta, Respuesta, Tema, Imagen},
                {new: true})
                if (!PreguntaActualizada){
                    return res.status(404).json({
                        message: 'No se encontró pregunta que actualizar'});
        }
        res.status(200).json({
            message: "La pregunta fue modificada con éxito"
        })
        } catch(err){
            return res.status(500).json({message : "No se pudo actualizar la pregunta, inténtelo más tarde ", err})
        }
    }
