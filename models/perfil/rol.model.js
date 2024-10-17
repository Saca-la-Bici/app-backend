const mongoose = require('mongoose');

/**
 * Modelo de rol para la colección "Rol".
 * 
 * Este modelo representa la estructura de un rol en la base de datos, 
 * definiendo los campos necesarios y sus tipos de datos. Los campos incluyen:
 * 
 * - `nombre`: Nombre del rol (requerido).
 * - `createdAt`: Fecha de creación del rol (inmutable, por defecto es la fecha actual).
 */


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