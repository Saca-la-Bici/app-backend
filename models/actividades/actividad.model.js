const mongoose = require('mongoose');
const Foro = require('../foro/foro.model');

const actividadSchema = new mongoose.Schema ({
    titulo: {
        type: String,
        minLength: 4,
        maxLength: 50, 
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
        maxLength: 150, 
        required: true
    },
    descripcion: {
        type: String, 
        minLength: 4,
        maxLength: 450,
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
    }]
});

// Middleware para crear un foro vacío antes de guardar la actividad
actividadSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const foro = await Foro.create({});
            this.foro = foro._id;
        } catch (error) {
            return next(error);
        }
    }
    next();
    
});

module.exports = actividadSchema