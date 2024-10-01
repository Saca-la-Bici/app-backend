const mongoose = require('mongoose');

const medallasSchema = new mongoose.Schema({
    IdMedalla: {
        type: Number, 
        required: true,
        unique: true
    },
    Nombre: {
        type: String,
        required: true
    },
    Imagen: {
        type: String, 
        required: true
    },
    FechaObtencion: {
        type: Date,
        required: true
    }
}, {
    collection: 'Medallas'
});

const Medalla = mongoose.model('Medalla', medallasSchema);

module.exports = Medalla;
