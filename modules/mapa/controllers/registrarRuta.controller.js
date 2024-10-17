const Ruta = require('../../../models/ruta/ruta.model');

exports.postRuta = async (req, res) => {
    try {
        console.log('Solicitud recibida en POST /registrarRuta');
        console.log('Datos recibidos:', req.body); // Verifica qué datos llegan al servidor

        // Crear un nuevo objeto Ruta con los datos recibidos
        const nuevaRuta = new Ruta({
            titulo: req.body.titulo,  // Asegúrate que los nombres coincidan en Android y backend
            distancia: req.body.distancia,
            tiempo: req.body.tiempo,
            nivel: req.body.nivel,
            coordenadas: req.body.coordenadas,  // Verifica si las coordenadas se reciben correctamente
            estatus: 1,
        });

        console.log('Nueva ruta creada:', nuevaRuta);

        // Guardar la ruta en la base de datos
        const rutaGuardada = await nuevaRuta.save();
        console.log('Ruta guardada exitosamente:', rutaGuardada);

        res.status(200).json(rutaGuardada);  // Respuesta exitosa
    } catch (error) {
        console.error('Error al guardar la ruta:', error);
        res.status(500).json({
            message: 'Error al guardar la ruta',
            error: error.message || error
        });
    }
};
