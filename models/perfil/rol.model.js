const mongoose = require('mongoose');

const RolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    }
}, {
    collection: 'Rol'
});

const Rol = mongoose.model('Rol', RolSchema);

module.exports = Rol;