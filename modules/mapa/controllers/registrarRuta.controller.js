const Ruta = require('../../../models/ruta/ruta.model');

exports.postRuta = async (req, res) => {
    try {
        const nuevaRuta = new Ruta({
            titulo: req.body.Titulo,
            distancia: req.body.Distancia,
            tiempo: req.body.Tiempo,
            nivel: req.body.Nivel,
            lugar: req.body.Lugar,
            descanso: req.body.Descanso,
            coordenadas: req.body.Coordenadas,
        });

        const rutaGuardada = await nuevaRuta.save();
        res.status(201).json(rutaGuardada);
    } catch (error) {
        console.error('Error al guardar la ruta:', error);
        res.status(500).json({
            message: 'Error al guardar la ruta',
            error: error.message || error
        });
    }
};