const mongoose = require('mongoose');
const coordenadaSchema = require('../ruta/ruta.model');

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
});

const rodadaSchema = new mongoose.Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }, 
    ruta: {
        type: [rutaSchema],
        required: true
    },
}, {
    collection: 'Rodadas'
});

const tallerSchema = new mongoose.Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }, 
    tipo: {
        type: "Taller",
        required: true
    },
}, {
    collection: 'Talleres'
});

const eventoSchema = new mongoose.Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }, 
    tipo: {
        type: "Evento",
        required: true
    },
}, {
    collection: 'Eventos'
});

const rodada = mongoose.model('Actividad', rodadaSchema);
const taller = mongoose.model('Taller', tallerSchema);
const evento = mongoose.model('Evento', eventoSchema);

module.exports = Actividad;