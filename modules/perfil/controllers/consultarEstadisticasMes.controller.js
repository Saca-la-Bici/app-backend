const Usuario = require("../../../models/perfil/usuario.model").Usuario;
// Importar node-cron
const cron = require('node-cron');

// Función para programar la tarea de cron que cambia el estado de la alerta
exports.getEstadisticasMes = async () => {
    // Tarea programada para ejecutarse el primer día de cada mes
    cron.schedule('30 23 * * *', async () => {
        try {
            // Reestablecer el campo a 0 de todos los usuarios
            const result = await Usuario.updateMany({}, { $set: { kilometrosMes: 0 } });
            console.log('Reinicio de los kilómetros mensuales');
            console.log('Resultado de la actualización:', result);
        } catch (err) {
            console.error('Error al actualizar los kilómetros mensuales:', err);
        }
    });
};
