const mongoose = require("mongoose");

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

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
    },
    fechaNacimiento: {
      type: Date,
    },
    tipoSangre: {
      type: String,
    },
    imagen: {
      type: String,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    numeroEmergencia: {
      type: String,
    },
    fechaRegistro: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    kilometrosRecorridos: {
      type: Number,
      default: 0,
    },
    tiempoEnRecorrido: {
      type: Number,
      default: 0.0,
    },
    rodadasCompletadas: {
      type: Number,
      default: 0,
    },
    firebaseUID: {
      type: String,
      unique: true,
      required: true,
    },

    ubicacion: {
      type: [ubicacionSchema]
    },
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
