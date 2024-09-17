const mongoose = require("mongoose");
const Rol = require("../../../models/perfil/rol.model");
const Privilegio = require("../../../models/perfil/privilegio.model");
const ContienePrivilegio = require("../../../models/perfil/contienePrivilegio.model");

const privilegiosPredeterminados = [
  { nombre: "crear_usuario", createdAt: new Date() },
  { nombre: "leer_usuario", createdAt: new Date() },
  { nombre: "actualizar_usuario", createdAt: new Date() },
  { nombre: "eliminar_usuario", createdAt: new Date() },
  { nombre: "crear_rol", createdAt: new Date() },
  { nombre: "leer_rol", createdAt: new Date() },
  { nombre: "actualizar_rol", createdAt: new Date() },
  { nombre: "eliminar_rol", createdAt: new Date() },
  { nombre: "asignar_privilegio_a_rol", createdAt: new Date() },
  { nombre: "eliminar_privilegio_de_rol", createdAt: new Date() },
  { nombre: "crear_recurso", createdAt: new Date() },
  { nombre: "leer_recurso", createdAt: new Date() },
  { nombre: "actualizar_recurso", createdAt: new Date() },
  { nombre: "eliminar_recurso", createdAt: new Date() },
  { nombre: "acceso_configuracion", createdAt: new Date() },
  { nombre: "actualizar_configuracion", createdAt: new Date() },
  { nombre: "ver_estadisticas", createdAt: new Date() },
  { nombre: "gestionar_politicas_seguridad", createdAt: new Date() },
  { nombre: "administrar_usuarios", createdAt: new Date() },
  { nombre: "acceso_funcionalidades_avanzadas", createdAt: new Date() },
];

const rolesPredeterminados = [
  { nombre: "admin", createdAt: new Date() },
  { nombre: "staff", createdAt: new Date() },
  { nombre: "usuario", createdAt: new Date() },
];

async function inicializarDatos() {
  try {
    // Conectar a la base de datos
    await mongoose.connect("mongodb://localhost:27017/miBaseDeDatos", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Crear Privilegios
    const privilegios = await Privilegio.insertMany(privilegiosPredeterminados);
    console.log("Privilegios creados:", privilegios);

    // Crear Roles
    const roles = await Rol.insertMany(rolesPredeterminados);
    console.log("Roles creados:", roles);

    // Asignar Privilegios a Roles
    const asignaciones = [
      // Admin tiene todos los privilegios
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_rol")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_rol")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_rol")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_rol")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "asignar_privilegio_a_rol"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "eliminar_privilegio_de_rol"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "acceso_configuracion"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "actualizar_configuracion"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "ver_estadisticas")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "gestionar_politicas_seguridad"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "administrar_usuarios"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "acceso_funcionalidades_avanzadas"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },

      // Staff tiene privilegios de CRUD y asignación de privilegios a roles
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "acceso_configuracion"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "acceso_funcionalidades_avanzadas"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },

      // Usuario tiene privilegios limitados
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_usuario")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_usuario")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "crear_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "leer_recurso")._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "actualizar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find((p) => p.nombre === "eliminar_recurso")
          ._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
      {
        IDPrivilegio: privilegios.find(
          (p) => p.nombre === "acceso_configuracion"
        )._id,
        IDRol: roles.find((r) => r.nombre === "admin")._id,
        createdAt: new Date(),
      },
    ];

    await ContienePrivilegio.insertMany(asignaciones);
    console.log("Privilegios asignados a roles.");

    // Desconectar de la base de datos
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error al inicializar datos:", error);
  }
}

inicializarDatos();
