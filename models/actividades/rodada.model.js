const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ruta = require('../ruta/ruta.model');
const actividadSchema = require('./actividad.model');

const ubicacionSchema = new mongoose.Schema({

    latitud: {
      type: Number,
      required: true
    },
  
    longitud: {
      type: Number,
      required: true
    },
  })
  

const rodadaSchema = new Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }, 
    ubicacion: {
        type: [ubicacionSchema]
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