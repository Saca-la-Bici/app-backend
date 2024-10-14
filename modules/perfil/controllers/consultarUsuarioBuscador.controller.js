const { Usuario } = require('../../../models/perfil/usuario.model');
const PoseeRol = require("../../../models/perfil/poseeRol.model");
const Rol = require("../../../models/perfil/rol.model");
const getUserImage = require("../../../util/getUserImage");

exports.getConsultarPerfilBuscador = async (request, response) => {
    const { page = 1, limit = 10, search, roles } = request.query; // Obtener roles desde la query
    const firebaseUID = request.userUID.uid; // Obtener el UID del usuario autenticado

    try {
        const pageInt = parseInt(page);
        const limitInt = parseInt(limit);

        // Validar los parámetros de paginación
        if (pageInt < 1 || limitInt < 1) {
            return response.status(400).json({ message: "Parámetros de paginación inválidos" });
        }

        // Construir la consulta de búsqueda
        const searchQuery = search
            ? {
                $and: [
                    {
                        $or: [
                            { nombre: { $regex: search, $options: "i" } },
                            { username: { $regex: search, $options: "i" } },
                            { correoElectronico: { $regex: search, $options: "i" } },
                        ],
                    },
                    { firebaseUID: { $ne: firebaseUID } } // Excluir al usuario autenticado
                ],
            }
            : { firebaseUID: { $ne: firebaseUID } }; // Solo excluir al usuario autenticado si no hay búsqueda

        // Buscar los usuarios que coinciden con la consulta
        let usuarios = await Usuario.find(searchQuery)
            .select("username nombre correoElectronico imagen") // Seleccionar campos específicos
            .lean(); // Para obtener un objeto JavaScript plano

        // Filtrar por roles si se especificaron
        let usuariosConRoles = [];
        let totalUsuariosConRoles = 0;
        if (roles) {
            const rolesArray = roles.split(",").map(role => role.trim());
            const rolDocs = await Rol.find({ nombre: { $in: rolesArray } }).select("_id"); // Obtener IDs de los roles

            const rolIds = rolDocs.map(rol => rol._id); // Extraer los IDs de los roles

            // Obtener los usuarios que tienen los roles especificados
            const poseerRolDocs = await PoseeRol.find({ IDRol: { $in: rolIds } }).select("IDUsuario");

            const usuarioIds = poseerRolDocs.map(rol => rol.IDUsuario.toString()); // Extraer los IDs de los usuarios

            // Filtrar los usuarios que tienen los roles especificados
            usuariosConRoles = usuarios.filter(usuario => usuarioIds.includes(usuario._id.toString()));

            // Actualizar el número total de usuarios con roles
            totalUsuariosConRoles = usuariosConRoles.length;

            // Paginación manual después del filtrado
            usuariosConRoles = usuariosConRoles.slice((pageInt - 1) * limitInt, pageInt * limitInt);
        } else {
            usuariosConRoles = usuarios; // Si no se proporcionaron roles, usar todos los usuarios encontrados
            totalUsuariosConRoles = usuariosConRoles.length; // Total de usuarios sin filtrado de roles
        }

        // Obtener la información del rol para los usuarios filtrados
        const result = await Promise.all(
            usuariosConRoles.map(async (usuario) => {
                const imagenPerfil = usuario.imagen
                    ? await getUserImage(usuario._id, usuario.imagen)
                    : null;

                const poseerRolDoc = await PoseeRol.findOne({ IDUsuario: usuario._id }).populate("IDRol", "nombre"); // Obtener el rol del usuario
                return {
                    usuario: {
                        id: usuario._id,
                        username: usuario.username,
                        nombre: usuario.nombre,
                        correoElectronico: usuario.correoElectronico,
                        imagenPerfil: imagenPerfil || null,
                    },
                    rol: poseerRolDoc ? { id: poseerRolDoc.IDRol._id, nombreRol: poseerRolDoc.IDRol.nombre } : null, // Devolver rol
                };
            })
        );

        if (result.length === 0) {
            return response.status(200).json({
                usuarios: [],
                currentPage: 0,
                totalUsuarios: 0,
                totalPages: 0
            });
        }

        // Responder con los datos de los usuarios filtrados y el número total de usuarios con roles
        response.status(200).json({
            usuarios: result,
            currentPage: pageInt,
            totalUsuarios: totalUsuariosConRoles, // Devolver el total de usuarios con roles
            totalPages: Math.ceil(totalUsuariosConRoles / limitInt), // Calcular total de páginas basado en usuarios con roles
        });
    } catch (error) {
        console.error("Error en getConsultarPerfilBuscador:", error);
        response.status(500).json({
            message: "Error al obtener los usuarios",
            error: error.toString(),
        });
    }
};