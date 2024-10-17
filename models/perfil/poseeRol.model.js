const mongoose = require('mongoose');

/**
 * Modelo de asignación de roles para la colección "Posee".
 * 
 * Este modelo representa la relación entre un usuario y un rol, donde cada documento indica
 * qué rol tiene asignado un usuario específico. Los campos definidos incluyen:
 * 
 * - `IDUsuario`: Identificador del usuario que tiene asignado el rol (referencia a la colección "Usuario", requerido).
 * - `IDRol`: Identificador del rol asignado al usuario (referencia a la colección "Rol", requerido).
 */

const PoseeRolSchema = new mongoose.Schema({
    IDUsuario: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Usuario"
    },
    IDRol: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Rol"
    }
}, {
    collection: 'Posee'
});

PoseeRolSchema.statics.patchRole = async (id, rolId) => {
    return await PoseeRol.findOneAndUpdate({ IDUsuario: id }, { IDRol: rolId }, { new: true });
};

const PoseeRol = mongoose.model('PoseeRol', PoseeRolSchema);

module.exports = PoseeRol;