const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function encontrarTipo(tipo) {
    if (tipo === 'rodada') return Rodada;
    if (tipo === 'taller') return Taller;
    if (tipo === 'evento') return Evento;
}

async function registrarActividad(tipo, data) {
    try {
        const { Modelo } = await encontrarTipo(tipo);
        const actividad = await Modelo.create(data);
        await actividad.save();
    } catch (error) {
        throw(error);
    }
}

module.exports = { registrarActividad };