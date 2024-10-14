const { Anuncio } = require('../models/otros/anuncio.model');
const cron = require('node-cron');

const borrarAnunciosCaducados = cron.schedule('0 0 * * *', async () => {
    try {
        const now = new Date();
        const result = await Anuncio.deleteMany({ fechaCaducidad: { $lte: now } });
        console.log(`Anuncios eliminados: ${result.deletedCount}`);
    } catch (error) {
        console.error('Error eliminando anuncios caducados:', error);
    }
});

module.exports = borrarAnunciosCaducados;