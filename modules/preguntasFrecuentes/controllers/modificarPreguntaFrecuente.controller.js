const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.modificarPreguntaFrecuente = async (req, res) => {

    // Obtenemos el ID de la URL
    const {IdPregunta} = req.params;

    // Obtenemos los datos de la pregunta a modificar
    const {Pregunta, Respuesta, Tema, Imagen} = req.body;

    try{
        // Buscamos la pregunta por su IDPregunta y la actualizamos
        const PreguntaActualizada = await PreguntaFrecuente.findOneAndUpdate({IdPregunta:IdPregunta},{Pregunta, Respuesta, Tema, Imagen}, {new: true})

        // Si no se encuentra la pregunta a actualizar, se envía un mensaje de error
        if (!PreguntaActualizada){
            return res.status(404).json({
                code: 404,
                msg: 'No se encontró pregunta que actualizar'
            });
        }

        // Se envía un mensaje de éxito si la pregunta fue modificada
        res.status(200).json({
            code: 200,
            msg: "La pregunta fue modificada con éxito"
        })

    } catch (error){ 
        console.error(error);
        // Se envía un mensaje de error si no se pudo actualizar la pregunta
        return res.status(500).json({
            code: 500,
            msg : "No se pudo actualizar la pregunta, inténtelo más tarde",
        })
    }
}