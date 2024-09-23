const mongoose = require('mongoose');


const actividadSchema = new mongoose.Schema ({
    titulo: {
        type: String, 
        required: true
    }, 
    fechaHora: {
        type: Date, 
        required: true
    }, 
    personasInscritas: {
        type: Number, 
        //required: true,
        default: 0
    },
    ubicacion: {
        type: String,
        required: true
    },
    // Incluye materiales requeridos para actividad
    descripcion: {
        type: String, 
        required: true
    }, 
    estado: {
        type: Boolean, 
        required: true
    },
    duracion: {
        type: Number, 
        required: true
    },
    imagen: {
        type: String,
        required: false
    },
    usuariosInscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de Usuario
    }]
});

module.exports = actividadSchema;