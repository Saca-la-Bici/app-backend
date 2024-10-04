const PreguntaFrecuente = require('../../../models/otros/preguntasFrecuentes.model');

exports.put_modificarPreguntaFrecuente = async (req,res) => {
        //Obtener id desde la petición
        const {IdPregunta} = req.params;
        //Obtener los otros datos
        const {Pregunta, Respuesta, Tema, Imagen} = req.body;
        //Validar que el id sea un número
        if (isNaN(IdPregunta)){
            return res.status(400).json({
                message: "Identificador de la pregunta no es un identificador",
                data: null
            })
        }
        //Validación de datos
        if(!Pregunta & !Respuesta & !Tema){
            return res.status(400).json({
                message: "Por favor rellene los campos",
                data: null
            })
        }
        if (!Pregunta){
            return res.status(400).json({
                message: "Por favor ingrese una pregunta",
                data: null
            })
        }
        else if (!Respuesta){
            return res.status(400).json({
                message: "Por favor ingrese una respuesta",
                data: null
            })
        }
        else if(!Tema){
            return res.status(400).json({
                message: "Por favor ingrese un tema",
                data: null
            })
        }

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