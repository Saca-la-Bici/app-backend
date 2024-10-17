const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema ({
    titulo: {
        type: String,
        minLength: 4,
        maxLength: 51, 
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
        default: 0
    },
    ubicacion: {
        type: String,
        maxLength: 151, 
        required: true
    },
    descripcion: {
        type: String, 
        minLength: 4,
        maxLength: 451,
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
    foro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Foro'
    },
    usuariosInscritos: [{
        type: String,
        ref: 'Usuario' // Referencia al modelo de Usuario
    }],
    fecha_fin: {
        type: Date,
        required: false
    }
});

module.exports = actividadSchema