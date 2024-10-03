const PoseeRol = require("../../../models/perfil/poseeRol.model");
const Usuario = require("../../../models/perfil/usuario.model").Usuario;
const Rol = require("../../../models/perfil/rol.model");
const getUserImage = require("../../../util/getUserImage");

exports.getUsuarios = async (req, res) => {
  const { page, limit, roles } = req.query;
  const firebaseUID = req.userUID.uid;

  try {
    const pageInt = isNaN(parseInt(page)) ? 1 : parseInt(page);
    const limitInt = isNaN(parseInt(limit)) ? 10 : parseInt(limit);

    if (pageInt < 1 || limitInt < 1) {
      return res
        .status(400)
        .json({ message: "Parámetros de paginación inválidos" });
    }

    const rolesArray = roles
      ? roles.split(",")
      : ["Administrador", "Staff", "Usuario"];
    const rolEspecial = rolesArray[0];
    const rolNormal = "Usuario";

    const rolEspecialDoc = await Rol.findOne({ nombre: rolEspecial }).select(
      "_id"
    );
    if (!rolEspecialDoc)
      return res.status(404).json({ message: "Rol no encontrado" });

    const usuario = await Usuario.findOne({ firebaseUID }).select("_id");
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const usuarioID = usuario._id;

    const totalEspeciales = await PoseeRol.countDocuments({
      IDRol: rolEspecialDoc._id,
      IDUsuario: { $ne: usuarioID },
    });

    let usuariosEspeciales = await PoseeRol.find({
      IDRol: rolEspecialDoc._id,
      IDUsuario: { $ne: usuarioID },
    })
      .populate({ path: "IDRol", select: "nombre" })
      .populate({
        path: "IDUsuario",
        match: { _id: { $ne: usuarioID } },
        select: "username nombre correoElectronico imagen",
      })
      .sort({ _id: 1 })
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt)
      .lean();

    const remainingLimit = limitInt - usuariosEspeciales.length;

    let usuariosNormales = [];
    if (remainingLimit > 0) {
      const rolNormalDoc = await Rol.findOne({ nombre: rolNormal }).select(
        "_id"
      );
      if (!rolNormalDoc)
        return res.status(404).json({ message: "Rol no encontrado" });

      usuariosNormales = await PoseeRol.find({
        IDRol: rolNormalDoc._id,
        IDUsuario: { $ne: usuarioID },
      })
        .populate({ path: "IDRol", select: "nombre" })
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

    const usuariosConRoles = [
      ...usuariosEspeciales,
      ...usuariosNormales,
    ].filter((ur) => ur.IDUsuario && ur.IDRol);

    const result = await Promise.all(
      usuariosConRoles.map(async (ur) => {
        const imagenPerfil = ur.IDUsuario.imagen
          ? await getUserImage(ur.IDUsuario._id, ur.IDUsuario.imagen)
          : null;
        return {
          usuario: {
            id: ur.IDUsuario._id,
            username: ur.IDUsuario.username,
            nombre: ur.IDUsuario.nombre,
            correoElectronico: ur.IDUsuario.correoElectronico,
            imagenPerfil: imagenPerfil || null,
          },
          rol: {
            id: ur.IDRol._id,
            nombreRol: ur.IDRol.nombre,
          },
        };
      })
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios." });
    }

    res.status(200).json({
      usuarios: result,
      currentPage: pageInt,
      totalUsuarios: totalEspeciales,
      totalPages: Math.ceil(totalEspeciales / limitInt),
    });
  } catch (error) {
    console.error("Error en getUsuarios:", error);
    res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.toString(),
    });
  }
};
