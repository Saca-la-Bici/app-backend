const mongoose = require('mongoose');

/**
 * Modelo de privilegio para la colección "Privilegio".
 * 
 * Este modelo representa la estructura de un privilegio en la base de datos, 
 * definiendo los campos necesarios y sus tipos de datos. Los campos incluyen:
 * 
 * - `nombre`: Nombre del privilegio (requerido).
 * - `createdAt`: Fecha de creación del privilegio (inmutable, por defecto es la fecha actual).
 */

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