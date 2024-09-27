const mongoose = require('mongoose');
const PoseeRol = require('../../../models/perfil/poseeRol.model');

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
