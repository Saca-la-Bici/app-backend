const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    nombre: {
      type: String,
    },
    edad: {
      type: Number,
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
    },
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
