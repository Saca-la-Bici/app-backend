const mongoose = require('mongoose');

const coordenadaSchema = new mongoose.Schema({
    latitud: {
        type: Number,
        required: true
    },
    longitud: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: true
    }
});

const rutaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    distancia: {
        type: String,
        required: true
    },
    tiempo: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true,
    },
    coordenadas: {
        type: [coordenadaSchema],
        required: true
    },
}, {
    collection: 'Rutas'
});

const Ruta = mongoose.model('Ruta', rutaSchema);

module.exports = Ruta;