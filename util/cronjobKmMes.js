const Usuario = require("../models/perfil/usuario.model").Usuario;
const cron = require("node-cron");

/**
 * Programa una tarea automática con cron que se ejecuta el primer día de cada mes a las 00:01.
 * La tarea reestablece el campo `kilometrosMes` a 0 para todos los usuarios.
 */
exports.start = () => {
  // Tarea programada para ejecutarse el primer día de cada mes a las 00:01
  cron.schedule("1 0 1 * *", async () => {
    try {
      // Reestablecer el campo kilometrosMes a 0 para todos los usuarios
      await Usuario.updateMany({}, { $set: { kilometrosMes: 0 } });
      console.log("Reinicio de los kilómetros mensuales completado");
    } catch (err) {
      console.error("Error al actualizar los kilómetros mensuales:", err);
    }
  });
};
