const mongoose = require("mongoose");

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
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);


async function putUsuario(IDUsuario, Username, nombre, tipoSangre, numeroEmergencia){
  const usuario = await Usuario.findById(IDUsuario);
  if (usuario) {
    usuario.username = Username;
    usuario.nombre = nombre
    usuario.tipoSangre = tipoSangre;
    usuario.numeroEmergencia = numeroEmergencia;
    
    await usuario.save();
    return usuario;
  } else {
    throw new Error('Usuario no encontrado');
   }
}


module.exports = {
  Usuario,
  putUsuario
};
