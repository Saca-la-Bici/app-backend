const PoseeRol = require("../../../models/perfil/poseeRol.model");

exports.getUsuarios = async (req, res) => {
  const { page, limit, roles, firebaseUID  } = req.query;

  try {
    // Verificar que los valores de page y limit sean números válidos
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    // Verificar que los valores de page y limit sean números válidos
    if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
      return res
        .status(400)
        .json({ message: "Parámetros de paginación inválidos" });
    }

    // Roles permitidos para filtrar
    const rolesArray = roles ? roles.split(",") : ["Administrador", "Staff", "Usuario"];

    // Contar el total de documentos para la paginación
    const totalUsuarios = await PoseeRol.countDocuments({});

    // Si no hay usuarios, devolver mensaje de error
    if (totalUsuarios === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }

    // Consultar los usuarios con roles, aplicando paginación y filtros de roles
    const usuariosConRoles = await PoseeRol.find()
      .populate({
        path: "IDRol",
        match: { nombre: { $in: rolesArray } }, // Filtrar por el nombre del Rol
        select: "nombre" // Traer solo el campo nombre
      })
      .populate({
        path: "IDUsuario",
        match: { firebaseUID: { $ne: firebaseUID } }, // Excluir por firebaseUID
      })
      .sort({ _id: 1 })
      .skip((pageInt - 1) * limitInt) // Saltar los documentos de las páginas anteriores
      .limit(limitInt); // Limitar el número de documentos devueltos

    // Filtrar y mapear los resultados
    const result = usuariosConRoles
      .filter((ur) => ur.IDUsuario && ur.IDRol) // Filtrar los registros que tengan ambos datos
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

    // Verificar si hay resultados después de la paginación
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron usuarios en esta página." });
    }

    // Enviar la respuesta con los usuarios, la página actual y la información de paginación
    res.status(200).json({
      usuarios: result,
      currentPage: pageInt, // Página actual
      totalUsuarios: totalUsuarios, // Total de usuarios
      totalPages: Math.ceil(totalUsuarios / limitInt), // Total de páginas
    });
  } catch (error) {
    // En caso de error, responder con un mensaje de error y el código HTTP 500
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};
