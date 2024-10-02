const PoseeRol = require("../../../models/perfil/poseeRol.model");
const Usuario = require("../../../models/perfil/usuario.model").Usuario;
const Rol = require("../../../models/perfil/rol.model");
const getImageFolder = require("../../../util/getImageFolder");

exports.getUsuarios = async (req, res) => {
  const { page, limit, roles } = req.query;

  // Obtener el firebaseUID del usuario autenticado
  const firebaseUID = req.userUID.uid;
  const folder = "profile/";

  try {
    // Verificar que los valores de page y limit sean números válidos
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);

    if (isNaN(pageInt) || isNaN(limitInt) || pageInt < 1 || limitInt < 1) {
      return res
        .status(400)
        .json({ message: "Parámetros de paginación inválidos" });
    }

    // Obtener el array de roles de la query (puede ser 'Administrador,Usuario' o 'Staff,Usuario')
    const rolesArray = roles
      ? roles.split(",")
      : ["Administrador", "Staff", "Usuario"];

    // Roles especiales (Administrador o Staff) y el rol normal (Usuario)
    const rolEspecial = rolesArray[0]; // El primer rol en la query ya sea Administrador o Staff
    const rolNormal = "Usuario"; // El segundo rol siempre es "Usuario"

    // Buscar el ObjectId del rol basado en el nombre
    const rolEspecialDoc = await Rol.findOne({ nombre: rolEspecial }).select(
      "_id"
    );
    if (!rolEspecialDoc) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }
    const rolEspecialID = rolEspecialDoc._id;

    // Buscar el ObjectId del usuario basado en firebaseUID
    const usuario = await Usuario.findOne({ firebaseUID: firebaseUID }).select(
      "_id"
    );

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const usuarioID = usuario._id;

    // Contar el total de documentos para los roles especiales
    const totalEspeciales = await PoseeRol.countDocuments({
      IDRol: rolEspecialID, // Usar el ObjectId aquí
      IDUsuario: { $ne: usuarioID },
    });

    // Consultar usuarios con el rol especial (Administrador o Staff)
    let usuariosEspeciales = await PoseeRol.find({
      IDRol: rolEspecialID, // Usar el ObjectId aquí
      IDUsuario: { $ne: usuarioID },
    })
      .populate({
        path: "IDRol",
        select: "nombre",
      })
      .populate({
        path: "IDUsuario",
        match: { _id: { $ne: usuarioID } },
        select: "username nombre correoElectronico imagen",
      })
      .sort({ _id: 1 })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .lean();

    // Si no hay más usuarios con el rol especial o la cantidad de usuarios especiales es menor al límite, cargar los usuarios normales
    const remainingLimit = limitInt - usuariosEspeciales.length;

    let usuariosNormales = [];
    if (remainingLimit > 0) {
      // Obtener el ObjectId del rol 'Usuario'
      const rolNormalDoc = await Rol.findOne({ nombre: rolNormal }).select(
        "_id"
      );
      if (!rolNormalDoc) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }
      const rolNormalID = rolNormalDoc._id;

      usuariosNormales = await PoseeRol.find({
        IDRol: rolNormalID,
        IDUsuario: { $ne: usuarioID },
      })
        .populate({
          path: "IDRol",
          select: "nombre",
        })
        .populate({
          path: "IDUsuario",
          match: { _id: { $ne: usuarioID } },
          select: "username nombre correoElectronico imagen",
        })
        .sort({ _id: 1 })
        .skip(Math.max(0, (pageInt - 1) * remainingLimit - totalEspeciales))
        .limit(remainingLimit)
        .lean();
    }

    // Combinar los resultados
    const usuariosConRoles = [...usuariosEspeciales, ...usuariosNormales];

    const usuariosFiltrados = usuariosConRoles.filter(
      (ur) => ur.IDUsuario && ur.IDRol
    );

    // Mapeamos los resultados y manejamos la imagen solo si es necesario
    const result = await Promise.all(
      usuariosFiltrados.map(async (ur) => {
        // Verificamos si el usuario tiene una imagen asociada
        if (ur.IDUsuario.imagen) {
          console.log(ur.IDUsuario.imagen);
          ur.IDUsuario.imagen = await getImageFolder(req, folder); // Obtenemos la imagen solo si existe
          console.log(ur.IDUsuario.imagen);
        }

        return {
          usuario: {
            id: ur.IDUsuario._id,
            username: ur.IDUsuario.username,
            nombre: ur.IDUsuario.nombre,
            correoElectronico: ur.IDUsuario.correoElectronico,
            imagenPerfil: ur.IDUsuario.imagen || null, // Será null si no tiene imagen
          },
          rol: {
            id: ur.IDRol._id,
            nombreRol: ur.IDRol.nombre,
          },
        };
      })
    );

    res.status(200).json({
      usuarios: result,
      currentPage: pageInt,
      totalUsuarios: totalEspeciales,
      totalPages: Math.ceil(totalEspeciales / limitInt),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
  }
};
