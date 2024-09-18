const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    immutable: true,
    required: true,
  },
  tipoSangre: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
  },
  numeroEmergencia: {
    type: String,
    required: true,
  },
  fechaRegistro: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  firebaseUID: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  collection: "Usuario",
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;