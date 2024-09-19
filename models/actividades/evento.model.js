const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actividad = require('./actividad.model');

const eventoSchema = new Schema ({
    actividad: {
        type: Actividad.schema,
        required: true
    }
}, {
    collection: 'Evento'
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;