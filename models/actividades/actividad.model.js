const mongoose = require('mongoose');
const comentarioSchema = require('../foro/comentario.model');

const actividadSchema = new mongoose.Schema ({
    titulo: {
        type: String,
        minLength: 4,
        maxLength: 200, 
        required: true
    }, 
    fecha: {
        type: Date, 
        required: true
    },
    hora: {
        type: String, 
        required: true
    }, 
    personasInscritas: {
        type: Number, 
        required: true
    },
    ubicacion: {
        type: String,
        maxLength: 200, 
        required: true
    },
    descripcion: {
        type: String, 
        minLength: 4,
        maxLength: 200,
        required: true
    }, 
    estado: {
        type: Boolean, 
        default: 1
    },
    duracion: {
        type: String, 
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: true,
        immutable: true,
        enum: ['Rodada', 'Taller', 'Evento']
    },
    comentarios: {
        type: [comentarioSchema],
        default: []
    },
});

module.exports = actividadSchema;