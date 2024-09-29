const Ruta = require('../../../models/ruta/ruta.model');

exports.getRutas = async (req, res) => {
    try {
        const rutas = await Ruta.find({});
        
        // Devolver las rutas junto con los permisos del usuario
        res.status(200).json({
            rutas: rutas,
            permisos: req.permisos  // Aquí devuelves los permisos
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las rutas', error });
    }
};

exports.getRuta = async (req, res) => {
    try {
        const { id } = req.params;  // Obtén el ID de los parámetros de la solicitud
        const ruta = await Ruta.findById(id);  // Busca la ruta por ID

        if (!ruta) {
            return res.status(404).json({ message: 'Ruta no encontrada' });
        }

        res.status(200).json({
            ruta: ruta,
            permisos: req.permisos  // Aquí devuelves los permisos
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la ruta', error });
    }
};
