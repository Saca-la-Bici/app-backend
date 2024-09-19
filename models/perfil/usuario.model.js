const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    firebaseUID: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
