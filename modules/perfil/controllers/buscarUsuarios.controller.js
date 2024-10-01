const { Usuario } = require("../../../models/perfil/usuario.model");
const PoseeRol = require("../../../models/perfil/poseeRol.model");

exports.searchUsuarios = async (req, res) => {
  const { query, roles } = req.query; // Obtener los parámetros de búsqueda y roles

  // Obtener el firebaseUID del usuario autenticado
  const firebaseUID = req.userUID.uid;

  try {
    // Consultar los usuarios cuyo username o correo coincidan con el criterio de búsqueda
    const usuarios = await Usuario.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // Búsqueda por username
      ],
      firebaseUID: { $ne: firebaseUID }, // Excluir al usuario autenticado
    });

    // Convertir los roles en un array
    const rolesArray = roles ? roles.split(",") : [];

    // Obtener los usuarios que tienen los roles específico
    const usuariosConRoles = await PoseeRol.find({
      IDUsuario: { $in: usuarios.map((u) => u._id) },
    })
      .populate("IDUsuario")
      .populate({
        path: "IDRol",
        match: { nombre: { $in: rolesArray } }, // Filtrar roles por el nombre
      });

    // Filtrar y estructurar la respuesta
    const result = usuariosConRoles
      .filter((ur) => ur.IDUsuario && ur.IDRol) // Filtrar registros válidos
      .map((ur) => ({
        usuario: {
          id: ur.IDUsuario._id,
          username: ur.IDUsuario.username,
          nombre: ur.IDUsuario.nombre,
          correoElectronico: ur.IDUsuario.correoElectronico,
          imagenPerfil: ur.IDUsuario.imagen,
        },
        rol: {
          id: ur.IDRol._id,
          nombreRol: ur.IDRol.nombre,
        },
      }));

    // Enviar la respuesta con los usuarios y roles
    res.status(200).json({ usuarios: result });
  } catch (error) {
    // En caso de error, responder con un mensaje de error
    res.status(500).json({ message: "Error al buscar los usuarios", error: error.message });
  }
};
