const Medalla = require('../../../models/medallas/medalla.model');

exports.consultarMedallas = async (req, res) => {
    try {
        const medallas = await Medalla.find();
        return res.status(200).json({
            code: 200,
            msg: 'Consulta de medallas exitosa',
            data: medallas
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            msg: 'Error al intentar consultar las medallas',
            data: null
        });
    }
};