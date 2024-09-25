const mongoose = require('mongoose');
const PoseeRol = require('../../../models/perfil/poseeRol.model');

exports.modificarRol = async (req, res) => {
    const { id, rolId } = req.body;

    try {
        // Convertir `id` y `rolId` a ObjectId
        const objectIdUsuario = new mongoose.Types.ObjectId(id);
        const objectIdRol = new mongoose.Types.ObjectId(rolId);

        // Buscar el usuario y el rol
        const usuario = await PoseeRol.findOne({ IDUsuario: objectIdUsuario });
        const rol = await PoseeRol.findOne({ IDRol: objectIdRol });

        // Validar si el usuario y el rol existen
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (!rol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        // Actualizar el rol del usuario
        usuario.IDRol = objectIdRol;
        await usuario.save();

        // Responder con el usuario actualizado
        return res.status(200).json({ 
            message: 'Rol actualizado exitosamente. Se le asignó su nuevo rol de ' + rol, 
            usuario 
        });
            } catch (error) {
        // Manejar errores y enviar respuesta
        return res.status(500).json({ error: 'Error al cambiar el rol: ' + error.message });
    }
}
