const Rol = require('../../../models/perfil/rol.model');
const Privilegio = require('../../../models/perfil/privilegio.model');
const ContienePrivilegio = require('../../../models/perfil/contienePrivilegio.model');

exports.registrarContiene = async (request, response) => {
    // Primero se verifica que la colleción este vacía
    try {
        // Hacer una consulta para verificar si existe cualquier registro
        const relacion = await ContienePrivilegio.findOne(); // Esto busca el primer registro que encuentre

        if (relacion) {
            return response.status(400).json({
                error: `La tabla de Contiene ya tiene permisos asociados a ciertos Roles. Si quieres resetear la colección favor de borrarla primero.`
            });
        } 
    } catch (error) {
        return response.status(400).json({
            error: error.message
        });
    }

    // Se insertan los privilegios de Staff
    try {
        const rolStaff = await Rol.findOne({
            nombre: 'Staff'
        });
        if (!rolStaff) {
            return response.status(404).json({
                message: 'Rol Staff no encontrado'
            });
        }

        // Busca los privilegios que quieres asociar con el rol "Staff"
        const privilegiosStaff = [
            'Consultar anuncio',
            'Registrar cuenta',
            'Consultar perfil propio',
            'Modificar perfil',
            'Eliminar cuenta',
            'Consultar actividades',
            'Registrar reporte',
            'Consultar foro',
            'Publicar comentario',
            'Modificar comentario',
            'Consultar sección de ayuda',
            'Iniciar rodada',
            'Desactivar rodada',
            'Registrar ruta',
            'Modificar ruta',
            'Eliminar ruta',
            'Consultar solicitudes de amistad',
            'Enviar solicitud de amistad',
            'Aceptar solicitud de amistad',
            'Rechazar solicitud de amistad',
            'Eliminar amigo',
            'Registrar pregunta frecuente',
            'Modificar pregunta frecuente',
            'Eliminar pregunta frecuente',
            'Consultar mapa',
            'Consultar notificaciones',
            'Consultar actividad individual',
            'Resolver solicitud de apoyo',
            'Cancelar solicitud de apoyo',
            'Buscar Usuarios',
            'Cancelar solicitud de amistad',
            'Bloquear usuario',
            'Consultar lista de amigos',
            'Desbloquear usuario',
            'Verificar asistencia'
        ];;

        // Buscar los privilegios en la colección
        const privilegios = await Privilegio.find({
            nombre: {
                $in: privilegiosStaff
            }
        });

        if (privilegios.length !== privilegiosStaff.length) {
            return response.status(404).json({
                message: 'No se encontraron todos los privilegios especificados para Staff',
                foundPrivilegios: privilegios.map(p => p.nombre)
            });
        }

        // Poblar la colección Contiene
        const contieneStaff = privilegios.map(privilegio => ({
            IDRol: rolStaff._id,
            IDPrivilegio: privilegio._id
        }));

        await ContienePrivilegio.insertMany(contieneStaff);

    } catch (error) {
        return response.status(400).json({
            error: error.message
        });
    }

    // Se insertan los privilegios de Administrador
    try {
        const rolAdmin = await Rol.findOne({
            nombre: 'Administrador'
        });
        if (!rolAdmin) {
            return response.status(404).json({
                message: 'Rol Staff no encontrado'
            });
        }

        // Busca los privilegios que quieres asociar con el rol "Admin"
        const privilegiosAdmin = [
            'Registrar anuncio',
            'Modificar anuncio',
            'Eliminar anuncio',
            'Consultar anuncio',
            'Registrar actividad',
            'Modificar actividad',
            'Eliminar actividad',
            'Consultar estadísticas',
            'Modificar rol',
            'Desactivar usuario',
            'Eliminar comentario',
            'Registrar cuenta',
            'Consultar perfil propio',
            'Modificar perfil',
            'Eliminar cuenta',
            'Consultar actividades',
            'Registrar reporte',
            'Consultar foro',
            'Publicar comentario',
            'Modificar comentario',
            'Consultar sección de ayuda',
            'Iniciar rodada',
            'Desactivar rodada',
            'Registrar ruta',
            'Modificar ruta',
            'Eliminar ruta',
            'Consultar solicitudes de amistad',
            'Enviar solicitud de amistad',
            'Aceptar solicitud de amistad',
            'Rechazar solicitud de amistad',
            'Eliminar amigo',
            'Registrar pregunta frecuente',
            'Modificar pregunta frecuente',
            'Eliminar pregunta frecuente',
            'Consultar mapa',
            'Consultar notificaciones',
            'Consultar actividad individual',
            'Resolver solicitud de apoyo',
            'Cancelar solicitud de apoyo',
            'Buscar Usuarios',
            'Cancelar solicitud de amistad',
            'Bloquear usuario',
            'Consultar lista de amigos',
            'Desbloquear usuario',
            'Verificar asistencia',
            'Consultar Usuarios'
        ];;

        // Buscar los privilegios en la colección
        const privilegios = await Privilegio.find({
            nombre: {
                $in: privilegiosAdmin
            }
        });

        if (privilegios.length !== privilegiosAdmin.length) {
            return response.status(404).json({
                message: 'No se encontraron todos los privilegios especificados para Admin',
                foundPrivilegios: privilegios.map(p => p.nombre)
            });
        }

        // Poblar la colección Contiene
        const contieneAdmin = privilegios.map(privilegio => ({
            IDRol: rolAdmin._id,
            IDPrivilegio: privilegio._id
        }));

        await ContienePrivilegio.insertMany(contieneAdmin);

    } catch (error) {
        return response.status(400).json({
            error: error.message
        });
    }

    try {
        const rolUsuario = await Rol.findOne({
            nombre: 'Usuario'
        });
        if (!rolUsuario) {
            return response.status(404).json({
                message: 'Rol Staff no encontrado'
            });
        }

        // Busca los privilegios que quieres asociar con el rol "Usuario"
        const privilegiosUsuario = [
            'Consultar anuncio',
            'Registrar cuenta',
            'Consultar perfil propio',
            'Modificar perfil',
            'Eliminar cuenta',
            'Consultar actividades',
            'Registrar reporte',
            'Consultar foro',
            'Publicar comentario',
            'Modificar comentario',
            'Consultar sección de ayuda',
            'Inscribir actividad',
            'Cancelar asistencia',
            'Consultar renta de bicicletas',
            'Solicitar apoyo',
            'Consultar solicitudes de amistad',
            'Enviar solicitud de amistad',
            'Aceptar solicitud de amistad',
            'Rechazar solicitud de amistad',
            'Eliminar amigo',
            'Consultar medallas/reconocimientos',
            'Consultar mapa',
            'Consultar notificaciones',
            'Consultar actividad individual',
            'Cancelar solicitud de apoyo',
            'Buscar Usuarios',
            'Cancelar solicitud de amistad',
            'Bloquear usuario',
            'Consultar lista de amigos',
            'Desbloquear usuario'
        ];

        // Buscar los privilegios en la colección
        const privilegios = await Privilegio.find({
            nombre: {
                $in: privilegiosUsuario
            }
        });

        if (privilegios.length !== privilegiosUsuario.length) {
            return response.status(404).json({
                message: 'No se encontraron todos los privilegios especificados para Usuario',
                foundPrivilegios: privilegios.map(p => p.nombre)
            });
        }

        // Poblar la colección Contiene
        const contieneUsuario = privilegios.map(privilegio => ({
            IDRol: rolUsuario._id,
            IDPrivilegio: privilegio._id
        }));

        await ContienePrivilegio.insertMany(contieneUsuario);

    } catch (error) {
        return response.status(400).json({
            error: error.message
        });
    }

    return response.status(201).json({
        message: 'Privilegios asignados a los roles con éxito'
    });
};