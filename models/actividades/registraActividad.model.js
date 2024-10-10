const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function postRodada(data) {
    if (data.informacion.fecha) {
        const fecha = new Date(data.informacion.fecha + "T00:00:00-06:00");
        data.informacion.fecha = fecha.toISOString();
    }
    const rodada = await Rodada.create(data);

    await rodada.save();
    return rodada;
}

async function postTaller(data) {
    if (data.informacion.fecha) {
        const fecha = new Date(data.informacion.fecha + "T00:00:00-06:00");
        data.informacion.fecha = fecha.toISOString();
    }

    const taller = await Taller.create(data);
    await taller.save();
    return taller;
}

async function postEvento(data) {
    if (data.informacion.fecha) {
        const fecha = new Date(data.informacion.fecha + "T00:00:00-06:00");
        data.informacion.fecha = fecha.toISOString();
    }
    const evento = await Evento.create(data);
    await evento.save();
    return evento;
}

module.exports = { 
    postRodada,
    postTaller,
    postEvento
};