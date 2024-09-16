const mongoose = require('mongoose');

const preguntasFrecuentesSchema = new mongoose.Schema({
    IDPregunta: {
        type: String, 
        required: true,
        unique: true
    },
    Pregunta: {
        type: String,
        required: true
    },
    Respuesta: {
        type: String, 
        required: true
    },
    Tema: {
        type: String,
        required: true
    },
    Imagen: {
        type: String,
        required: false
    }
}, {
    collection: 'PreguntasFrecuentes'
});

const PreguntaFrecuente = mongoose.model('PreguntaFrecuente', preguntasFrecuentesSchema);

module.exports = PreguntaFrecuente;
