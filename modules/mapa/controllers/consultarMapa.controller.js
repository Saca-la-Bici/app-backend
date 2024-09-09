const Ruta = require('../../../models/ruta/ruta.model');

exports.getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find({})  
        res.json(rutas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las rutas', error });
    }
};
