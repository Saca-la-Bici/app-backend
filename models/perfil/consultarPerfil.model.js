const mongoose = require('mongoose');

const DatosPerfilSchema = new mongoose.Schema({
    IDUsuario: {
        type: String, 
        required: true,
        unique: true
    },
    Nombre: {
        type: String, 
        required: true,
    },
    Rodadas: {
        type: Number,
        required: true
    },
    Kilometros: {
        type: Number, 
        required: true
    },
    Amigos: {
        type: Number,
        required: true
    },
    Foto: {
        type: String,
        required: false
    },
    TipoSangre: {
        type: String,
        required: false
    }
}, {
    collection: 'DatosPerfil'
});

const DatosPerfil = mongoose.model('DatosPerfil', DatosPerfilSchema);

module.exports = DatosPerfil;