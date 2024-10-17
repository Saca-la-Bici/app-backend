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
      required: false,
    },
    fechaNacimiento: {
      type: Date,
      required: false,
    },
    tipoSangre: {
      type: String,
      required: false,
    },
    imagen: {
      type: String,
      required: false,
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
      required: false,
    },
    tiempoEnRecorrido: {
      type: Number,
      default: 0.0,
      required: false,
    },
    rodadasCompletadas: {
      type: Number,
      default: 0,
      required: false,
    },
    firebaseUID: {
      type: String,
      unique: true,
      required: true,
    },
    fcmTokens: {
      type: [String],
      default: [],
      required: false,
    },
    estadoMedallas: {
      type: [Boolean],
      default: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
      required: false,
    },
    kilometrosMes: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  {
    collection: "Usuario",
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

// async function patchPerfil(firebaseUID, Username, nombre, tipoSangre, numeroEmergencia){
//   try{
//     const usuario = await Usuario.findOne({firebaseUID: firebaseUID})
//     if (usuario) {
//       usuario.username = Username;
//       usuario.nombre = nombre
//       usuario.tipoSangre = tipoSangre;
//       usuario.numeroEmergencia = numeroEmergencia;

//       await usuario.save();
//       return usuario;
//     } else {
//       throw new Error('Usuario no encontrado');
//      }
//   }catch (error) {
//     throw error;
//   }
// }

// module.exports = {
//   Usuario,
//   patchPerfil,
// };

// Función para encontrar un usuario por firebaseUID y devolver firebaseUID y username
async function findUserByFirebaseUID(firebaseUID) {
  const usuario = await Usuario.findOne({ firebaseUID: firebaseUID }).select('username firebaseUID').lean();
  return usuario;
}

async function patchPerfil(
  firebaseUID,
  imagen,
  Username,
  nombre,
  tipoSangre,
  numeroEmergencia
) {
  const usuario = await Usuario.findOne({ firebaseUID: firebaseUID });
  if (usuario) {
    usuario.imagen = imagen;
    usuario.username = Username;
    usuario.nombre = nombre;
    usuario.tipoSangre = tipoSangre;
    usuario.numeroEmergencia = numeroEmergencia;
    await usuario.save();
    return usuario;
  } else {
    throw new Error("Usuario no encontrado");
  }
}

async function getImagen(firebaseUID) {
  const perfil = await Usuario.findOne({ firebaseUID: firebaseUID });
  return perfil.imagen;
}

async function deleteUser(firebaseUID) {
  await Usuario.findOneAndDelete({ firebaseUID: firebaseUID });
}

module.exports = {
  Usuario,
  patchPerfil,
  getImagen,
  deleteUser,
  findUserByFirebaseUID,
};
