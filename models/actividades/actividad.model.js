const mongoose = require('mongoose');

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
    ubicacion: {
        type: String,
        required: true
    },
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

const actividad = mongoose.model('Actividad', actividadSchema);

module.exports = actividad;