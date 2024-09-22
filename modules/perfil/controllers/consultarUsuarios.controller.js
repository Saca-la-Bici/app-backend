const PoseeRol = require('../../../models/perfil/poseeRol.model');

exports.getUsuarios = async (req, res) => {
    try {
        //Consultar los usuarios con los roles
        const usuariosConRoles = await PoseeRol.find({})
            .populate('IDUsuario')  //Aquí unimos la relación con el Usuario
            .populate('IDRol');     //Aquí unimos la relación con el Rol
        
        //Verificar que ambos objetos (usuario y rol) existan
        const result = usuariosConRoles
            .filter(ur => ur.IDUsuario && ur.IDRol)  //Filtrar los registros que tengan ambos datos
            .map(ur => ({
                usuario: {
                    id: ur.IDUsuario._id,
                    username: ur.IDUsuario.username,
                    nombre: ur.IDUsuario.nombre,
                    correoElectronico: ur.IDUsuario.correoElectronico,
                },
                rol: {
                    id: ur.IDRol._id,
                    nombreRol: ur.IDRol.nombre
                }
            }));

        //Enviar la respuesta con los usuarios y roles
        res.status(200).json({ usuarios: result });

    } catch (error) {
        //En caso de error, responder con un mensaje de error y el código HTTP 500 (Error interno del servidor)
        res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
};
