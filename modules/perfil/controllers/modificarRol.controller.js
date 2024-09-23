const PoseeRol = require('../../../models/perfil/poseeRol.model');

exports.modificarRol = async (req, res) => {
    const { id } = req.body; // ID del usuario
    const { rolId } = req.body; // ID del rol a asignar

    try {
        // Buscar el usuario y el rol
        const usuario = await PoseeRol.findById(id);
        const rol = await PoseeRol.findById(rolId);

        // Validar si el usuario y el rol existen
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        if (!rol) {
            return res.status(404).json({ error: 'Rol no encontrado' });
        }

        // Actualizar el rol del usuario
        usuario.IDRol = rolId;
        await usuario.save();

        // Responder con el usuario actualizado
        return res.status(200).json({ message: 'Rol actualizado exitosamente', usuario });
    } catch (error) {
        // Manejar errores y enviar respuesta
        return res.status(500).json({ error: 'Error al cambiar el rol: ' + error.message });
    }
}
