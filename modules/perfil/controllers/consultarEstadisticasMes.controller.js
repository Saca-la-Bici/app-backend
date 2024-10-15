// Importar node-cron
const cron = require('node-cron');

// Variable para almacenar el estado de la alerta
let alertaMensual = false;

// Función para programar la tarea de cron que cambia el estado de la alerta
exports.getEstadisticasMes = async (req, res) => {
    // Tarea programada para ejecutarse el primer día de cada mes
    cron.schedule('4 9 * * *', () => {
        // Cambiar la alerta a true cada mes
        alertaMensual = true;
        console.log('Alerta mensual activada:', alertaMensual);
    });

    // Devolver el estado actual de la alerta cuando el frontend lo solicite
    res.json({
        alerta: alertaMensual,
    });

    // Después de devolver la alerta, opcionalmente puedes reiniciar el estado
    alertaMensual = false; // Si quieres que se restablezca después de ser consultada
};
