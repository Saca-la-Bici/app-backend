const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ruta = require('../ruta/ruta.model');

const actividadSchema = new Schema ({
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
    ubicacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true
    }],
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

const Actividad = mongoose.model('Actividad', actividadSchema);

module.exports = Actividad;