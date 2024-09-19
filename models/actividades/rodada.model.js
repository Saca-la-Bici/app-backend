const mongoose = require('mongoose');
const actividadSchema = require('./actividad.model');
const {rutaSchema, coordenadaSchema} = require('../ruta/ruta.model');

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
    collection: 'Rodada'
});

const rodada = mongoose.model('Rodada', rodadaSchema);

module.exports = rodada;