const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ruta = require('../ruta/ruta.model');
const actividadSchema = require('./actividad.model');

const rodadaSchema = new Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }, 
    ruta: [{
        type: Schema.Types.ObjectId,
        ref: 'Ruta',
        required: true
    }],
}, {
    collection: 'Rodada'
});

const Rodada = mongoose.model('Rodada', rodadaSchema);

module.exports = Rodada;