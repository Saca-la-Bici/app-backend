const mongoose = require('mongoose');
const rutaSchema = require('../ruta/ruta.model');
const actividadSchema = require('./actividad.model');

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

const rodada = mongoose.model('Rodada', rodadaSchema);

module.exports = rodada;