const mongoose = require('mongoose');

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