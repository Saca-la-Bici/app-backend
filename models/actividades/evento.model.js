const mongoose = require('mongoose');
const actividadSchema = require('./actividad.model');

const eventoSchema = new mongoose.Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }
}, {
    collection: 'Evento'
});

const evento = mongoose.model('Evento', eventoSchema);

module.exports = evento;