const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.eliminarPreguntaFrecuente = async (req, res) => {

    // Obtenemos el ID de la URL
    const {IdPregunta} = req.params;

    try{
        // Buscamos la pregunta por su IdPregunta y la eliminamos
        const result = await PreguntaFrecuente.deleteOne({IdPregunta:IdPregunta});
        
        console.log(result);

        // Si no se encuentra la pregunta a eliminar, se envía un mensaje de error
        if (result.deletedCount === 0){
            return res.status(404).json({
                code: 404,
                msg: 'No se encontró pregunta que eliminar'
            });
        }

        // Se envía un mensaje de éxito si la pregunta fue eliminada
        res.status(200).json({
            code: 200,
            msg: "La pregunta fue eliminada con éxito"
        })

    } catch (error){ 
        console.error(error);
        // Se envía un mensaje de error si no se pudo eliminar la pregunta
        return res.status(500).json({
            code: 500,
            msg : "No se pudo eliminar la pregunta, inténtelo más tarde",
        })
    }
}