const Rol = require("../../../models/perfil/rol.model");
const Privilegio = require("../../../models/perfil/privilegio.model");
const ContienePrivilegio = require("../../../models/perfil/contienePrivilegio.model");

exports.registrarContiene = async (request, response) => {
  // Primero se verifica que la colección esté vacía
  try {
    const relacion = await ContienePrivilegio.findOne(); // Busca el primer registro que encuentre

    if (relacion) {
      return response.status(400).json({
        error: `La tabla de Contiene ya tiene permisos asociados a ciertos Roles. Si quieres resetear la colección favor de borrarla primero.`,
      });
    }
  } catch (error) {
    return response.status(400).json({
      error: error.message,
    });
  }

  // Helper para encontrar privilegios que no se encontraron
  const findMissingPrivileges = (allPrivilegios, foundPrivilegios) => {
    const foundNames = new Set(foundPrivilegios.map((p) => p.nombre));
    return allPrivilegios.filter((name) => !foundNames.has(name));
  };

  const processRole = async (roleName, privilegiosLista) => {
    try {
      const rol = await Rol.findOne({ nombre: roleName });
      if (!rol) {
        return response.status(404).json({
          message: `Rol ${roleName} no encontrado`,
        });
      }

      // Buscar los privilegios en la colección
      const privilegios = await Privilegio.find({
        nombre: { $in: privilegiosLista },
      });

      // Identificar privilegios no encontrados
      const missingPrivilegios = findMissingPrivileges(
        privilegiosLista,
        privilegios
      );

      if (missingPrivilegios.length > 0) {
        return response.status(404).json({
          message: `No se encontraron todos los privilegios especificados para ${roleName}`,
          foundPrivilegios: privilegios.map((p) => p.nombre),
          missingPrivilegios: missingPrivilegios,
        });
      }

      // Poblar la colección Contiene
      const contiene = privilegios.map((privilegio) => ({
        IDRol: rol._id,
        IDPrivilegio: privilegio._id,
      }));

      await ContienePrivilegio.insertMany(contiene);
    } catch (error) {
      return response.status(400).json({
        error: error.message,
      });
    }
  };

  // Procesar los privilegios para cada rol
  await processRole("Staff", [
    "Consultar anuncio",
    "Registrar cuenta",
    "Consultar perfil propio",
    "Modificar perfil",
    "Eliminar cuenta",
    "Consultar actividades",
    "Registrar reporte",
    "Consultar foro",
    "Publicar comentario",
    "Modificar comentario",
    "Consultar sección de ayuda",
    "Iniciar rodada",
    "Desactivar rodada",
    "Registrar ruta",
    "Modificar ruta",
    "Eliminar ruta",
    "Consultar solicitudes de amistad",
    "Enviar solicitud de amistad",
    "Aceptar solicitud de amistad",
    "Rechazar solicitud de amistad",
    "Eliminar amigo",
    "Registrar pregunta frecuente",
    "Modificar pregunta frecuente",
    "Eliminar pregunta frecuente",
    "Consultar mapa",
    "Consultar notificaciones",
    "Consultar actividad individual",
    "Resolver solicitud de apoyo",
    "Cancelar solicitud de apoyo",
    "Buscar Usuarios",
    "Cancelar solicitud de amistad",
    "Bloquear usuario",
    "Consultar lista de amigos",
    "Desbloquear usuario",
    "Verificar asistencia",
  ]);

  await processRole("Administrador", [
    "Registrar anuncio",
    "Modificar anuncio",
    "Eliminar anuncio",
    "Consultar anuncio",
    "Registrar actividad",
    "Modificar actividad",
    "Eliminar actividad",
    "Consultar estadísticas",
    "Modificar rol",
    "Desactivar usuario",
    "Eliminar comentario",
    "Registrar cuenta",
    "Consultar perfil propio",
    "Modificar perfil",
    "Eliminar cuenta",
    "Consultar actividades",
    "Registrar reporte",
    "Consultar foro",
    "Publicar comentario",
    "Modificar comentario",
    "Consultar sección de ayuda",
    "Iniciar rodada",
    "Desactivar rodada",
    "Registrar ruta",
    "Modificar ruta",
    "Eliminar ruta",
    "Consultar solicitudes de amistad",
    "Enviar solicitud de amistad",
    "Aceptar solicitud de amistad",
    "Rechazar solicitud de amistad",
    "Eliminar amigo",
    "Registrar pregunta frecuente",
    "Modificar pregunta frecuente",
    "Eliminar pregunta frecuente",
    "Consultar mapa",
    "Consultar notificaciones",
    "Consultar actividad individual",
    "Resolver solicitud de apoyo",
    "Cancelar solicitud de apoyo",
    "Buscar Usuarios",
    "Cancelar solicitud de amistad",
    "Bloquear usuario",
    "Consultar lista de amigos",
    "Desbloquear usuario",
    "Verificar asistencia",
    "Consultar Usuarios",
  ]);

  await processRole("Usuario", [
    "Consultar anuncio",
    "Registrar cuenta",
    "Consultar perfil propio",
    "Modificar perfil",
    "Eliminar cuenta",
    "Consultar actividades",
    "Registrar reporte",
    "Consultar foro",
    "Publicar comentario",
    "Modificar comentario",
    "Consultar sección de ayuda",
    "Inscribir actividad",
    "Cancelar asistencia",
    "Consultar renta de bicicletas",
    "Solicitar apoyo",
    "Consultar solicitudes de amistad",
    "Enviar solicitud de amistad",
    "Aceptar solicitud de amistad",
    "Rechazar solicitud de amistad",
    "Eliminar amigo",
    "Consultar medallas/reconocimientos",
    "Consultar mapa",
    "Consultar notificaciones",
    "Consultar actividad individual",
    "Cancelar solicitud de apoyo",
    "Buscar Usuarios",
    "Cancelar solicitud de amistad",
    "Bloquear usuario",
    "Consultar lista de amigos",
    "Desbloquear usuario",
  ]);

  return response.status(201).json({
    message: "Privilegios asignados a los roles con éxito",
  });
};
