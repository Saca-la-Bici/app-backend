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
    ruta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Ruta,
        required: true
    },
    ubicacion: {
      type: [ubicacionSchema]
    },
    codigoAsistencia: { 
      type: Number,
      default: 0,
      required: false
    },
    usuariosVerificados: {
      type: [String],
      default: [],
      required: false 
    }
  }, 
  {
    collection: 'Rodada'
});

const Rodada = mongoose.model('Rodada', rodadaSchema);

module.exports = Rodada;
