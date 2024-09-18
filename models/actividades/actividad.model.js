const mongoose = require('mongoose');
const {rutaSchema, coordenadaSchema} = require('../ruta/ruta.model');

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
        required: true
    },
    ubicacion: {
        type: [coordenadaSchema],
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
    }
});

//const actividad = mongoose.model('Actividad', actividadSchema);

module.exports = actividadSchema;