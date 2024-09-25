const Usuario = require("../../../models/perfil/usuario.model");
const Rol = require("../../../models/perfil/rol.model");
const PoseeRol = require("../../../models/perfil/poseeRol.model"); // Modelo para la relación entre usuario y rol

exports.registrarUsuario = async (request, response) => {
  try {
    // Extraer los datos del body
    const {
      username,
      nombre,
      fechaNacimiento,
      tipoSangre,
      correoElectronico,
      numeroEmergencia,
      firebaseUID,
    } = request.body;

    // Validar que los campos requeridos estén presentes
    if (!username || !correoElectronico || !firebaseUID) {
      return response.status(400).json({
        message:
          "Faltan datos requeridos: username, correoElectronico o firebaseUID",
      });
    }

    // Verificar si el usuario ya está registrado en MongoDB
    let existingUser = await Usuario.findOne({ firebaseUID });

    if (existingUser) {
      // Si el usuario ya existe, responder con éxito
      return response.status(200).json({
        message: "Usuario ya registrado",
        user: existingUser,
      });
    }

    // Buscar el rol "Usuario"
    const rolUsuario = await Rol.findOne({ nombre: "Usuario" });

    if (!rolUsuario) {
      return response.status(404).json({
        message: "Rol Usuario no encontrado",
      });
    }

    // Crear el usuario en MongoDB
    const newUser = new Usuario({
      username,
      nombre,
      fechaNacimiento,
      tipoSangre,
      correoElectronico,
      numeroEmergencia,
      firebaseUID,
    });

    await newUser.save();

    // Crear la relación entre el usuario y el rol en la tabla PoseeRol
    const poseeRol = new PoseeRol({
      IDUsuario: newUser._id, // ObjectId del nuevo usuario
      IDRol: rolUsuario._id, // ObjectId del rol "Usuario"
    });

    await poseeRol.save();

    // Responder con éxito
    response.status(201).json({
      message: "Usuario registrado con éxito",
      user: newUser,
    });
  } catch (error) {
    // Manejo de errores
    console.error("Error al registrar usuario:", error);
    response.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
