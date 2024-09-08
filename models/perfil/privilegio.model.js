const mongoose = require('mongoose');

const PrivilegioSchema = new mongoose.Schema({
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
    collection: 'Privilegio'
});

const Privilegio = mongoose.model('Privilegio', PrivilegioSchema);

module.exports = Privilegio;