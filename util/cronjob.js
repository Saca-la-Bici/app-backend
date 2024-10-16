const cron = require('node-cron');
const { Anuncio } = require('../models/otros/anuncio.model');
const { actualizarEstadoActividades } = require('../models/actividades/consultarActividades.model');

const borrarAnunciosCaducados = cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        await Anuncio.deleteMany({ fechaCaducidad: { $lte: now } });
    } catch (error) {
        console.error('Error eliminando anuncios caducados:', error);
    }
});

// Programar el cron job para que se ejecute cada día a las 23:00
const actualizarEstadoActsCron = cron.schedule('0 0 * * *', async () => {
    try {
        await actualizarEstadoActividades();
    } catch (error) {
        console.error('Error actualizando estado de las actividades:', error);
    }
});

module.exports = { 
    borrarAnunciosCaducados, 
    actualizarEstadoActsCron
};