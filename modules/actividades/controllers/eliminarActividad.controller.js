const { eliminarActividadModel } = require('../../../models/actividades/eliminarActividad.model');

/**
 * @description Elimina una actividad de la base de datos
 * 
 * @param req
 * @param res 
 */
const eliminarActividad = async (req, res) => {

    // Obtener el id y el tipo de actividad
    const { id, tipo } = req.body;

    // Validar que el tipo sea correcto
    if (tipo !== 'Rodada' && tipo !== 'Evento' && tipo !== 'Taller') {
        return res.status(400).json({
            code: 400,
            msg: 'Tipo de actividad no válido',
            data: null
        });
    }

    // Eliminar la actividad (actualizar el campo `estado` a false)

    var result;

    try {
        result = await eliminarActividadModel(id)

        return res.status(200).json({
            code: 200,
            msg: 'Actividad eliminada correctamente',
            data: result
        });
    } catch {
        return res.status(500).json({
            code: 500,
            msg: 'Error al eliminar la actividad', 
            data: null
        });
    }
}

module.exports = { eliminarActividad }