const mongoose = require('mongoose');
const PoseeRol = require('../../../models/perfil/poseeRol.model');

/**
 * Controlador para actualizar el rol de un usuario.
 * 
 * Modifica el rol de un usuario específico en la base de datos.
 * 
 * - Se espera que el ID del usuario sea proporcionado como un parámetro en la ruta.
 * - Se requiere un rolId en el cuerpo de la solicitud para asignar el nuevo rol.
 * - Si el ID del usuario no es válido, se devuelve un error 400.
 * - Si el rolId no se proporciona, se devuelve un error 400.
 * - Si no se encuentra el usuario o el rol especificado, se devuelve un error 404.
 * - En caso de error en la base de datos, se devuelve un error 500.
 */

exports.patchRole = async (req, res) => {
    const id = req.params.id;
    const rolId = req.body.rolId; 
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID de usuario no válido' });
    }

    if (!rolId) {
        return res.status(400).json({ error: 'El campo rolId es requerido' });
    }

    try {
        const poseeNuevoRol = await PoseeRol.patchRole(id, rolId);
        if (!poseeNuevoRol) {
            return res.status(404).json({ error: 'Usuario o rol no encontrado' });
        }
        return res.status(200).json(poseeNuevoRol);
    } catch (error) {
        console.error(error); // Registra el error para depuración
        return res.status(500).json({ error: 'Error al cambiar el rol: ' + error.message });
    }
};
