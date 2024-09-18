const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actividad = require('./actividad.model');

const eventoSchema = new Schema ({
    informacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    }]
}, {
    collection: 'Eventos'
});

const Evento = mongoose.model('Evento', eventoSchema);

module.exports = Evento;