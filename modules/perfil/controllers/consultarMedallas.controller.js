const Medalla = require('../../../models/medallas/medalla.model');

exports.getMedallas = async (req, res) => {
    try {
        const medallas = await Medalla.find();
        return res.status(200).json({
            code: 200,
            msg: 'Consulta de medallas exitosa',
            permisos: req.permisos,
            data: medallas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar las medallas',
            permisos: req.permisos,
            data: null
        });
    }
};
