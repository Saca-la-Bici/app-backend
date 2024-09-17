const mongoose = require('mongoose');

const PoseeRolSchema = new mongoose.Schema({
    IDUsuario: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Usuario"
    },
    IDRol: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Rol"
    }
}, {
    collection: 'Posee'
});

const PoseeRol = mongoose.model('PoseeRol', PoseeRolSchema);

module.exports = PoseeRol;