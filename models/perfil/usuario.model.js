const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: String,
    nombre: String,
    edad: Number,
    contraseña: String,
    tipoSangre: String,
    correoElectronico: String,
    numeroEmergencia: String,
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'Usuarios'
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;