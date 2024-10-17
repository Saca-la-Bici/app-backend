const mongoose = require("mongoose");

/**
 * Modelo de usuario para la colección "Usuario".
 * 
 * Este modelo representa la estructura de un usuario en la base de datos, 
 * definiendo los campos necesarios y sus tipos de datos. Los campos incluyen:
 * 
 * - `username`: Nombre de usuario único y requerido.
 * - `nombre`: Nombre del usuario (opcional).
 * - `fechaNacimiento`: Fecha de nacimiento del usuario (opcional).
 * - `tipoSangre`: Tipo de sangre del usuario (opcional).
 * - `imagen`: URL de la imagen de perfil del usuario (opcional).
 * - `correoElectronico`: Correo electrónico único y requerido.
 * - `numeroEmergencia`: Número de contacto de emergencia (opcional).
 * - `fechaRegistro`: Fecha de registro del usuario (inmutable, por defecto es la fecha actual).
 * - `kilometrosRecorridos`: Total de kilómetros recorridos (por defecto 0, opcional).
 * - `tiempoEnRecorrido`: Tiempo total en recorrido en horas (por defecto 0.0, opcional).
 * - `rodadasCompletadas`: Total de rodadas completadas (por defecto 0, opcional).
 * - `firebaseUID`: Identificador único de Firebase (único y requerido).
 * - `fcmTokens`: Tokens de Firebase Cloud Messaging (por defecto vacío, opcional).
 * - `estadoMedallas`: Estado de las medallas del usuario (por defecto un arreglo con valores booleanos, opcional).
 * - `kilometrosMes`: Kilómetros recorridos en el mes actual (por defecto 0, opcional).
 */

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
};
