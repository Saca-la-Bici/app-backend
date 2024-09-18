const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ruta = require('../ruta/ruta.model');
const Actividad = require('./actividad.model');

const rodadaSchema = new Schema ({
    actividad: [{
        type: Actividad.schema,
        required: true
    }], 
    ruta: [{
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true
    }],
}, {
    collection: 'Rodadas'
});

const Rodada = mongoose.model('Rodada', rodadaSchema);

module.exports = Rodada;