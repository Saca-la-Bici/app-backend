const { Usuario } = require("../../../models/perfil/usuario.model");
const PoseeRol = require("../../../models/perfil/poseeRol.model");

exports.searchUsuarios = async (req, res) => {
  const { query } = req.query; // Recibe el criterio de búsqueda desde la URL, por ejemplo: ?query=john.doe

  // Obtener el firebaseUID del usuario autenticado
  const firebaseUID = req.userUID.uid;

  try {
    // Consultar los usuarios cuyo username o correo coincidan con el criterio
    const usuarios = await Usuario.find({
      $or: [
        { username: { $regex: query, $options: "i" } }, // Búsqueda por username (case-insensitive)
        { correoElectronico: { $regex: query, $options: "i" } }, // Búsqueda por correo electrónico
      ],
      firebaseUID: { $ne: firebaseUID }, // Excluir al usuario con el mismo firebaseUID
    });

    // Obtener los roles relacionados para cada usuario encontrado
    const usuariosConRoles = await PoseeRol.find({
      IDUsuario: { $in: usuarios.map((u) => u._id) },
    })
      .populate("IDUsuario") // Unir con los datos del usuario
      .populate("IDRol"); // Unir con los roles

    // Filtrar y estructurar la respuesta
    const result = usuariosConRoles
      .filter((ur) => ur.IDUsuario && ur.IDRol) // Filtrar registros válidos
      .map((ur) => ({
        usuario: {
          id: ur.IDUsuario._id,
          username: ur.IDUsuario.username,
          nombre: ur.IDUsuario.nombre,
          correoElectronico: ur.IDUsuario.correoElectronico,
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
    res
      .status(500)
      .json({ message: "Error al buscar los usuarios", error: error.message });
  }
};
