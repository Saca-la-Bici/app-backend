const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function postRodada(data, id) {
    data.ruta = id;
    if (Array.isArray(data.informacion)) {
        data.informacion = data.informacion.map(info => {
            if (info.fecha) {
                const fecha = new Date(info.fecha);
                info.fecha = fecha.toISOString();
            }
            return info;
        });
    }
    const rodada = await Rodada.create(data);

    await rodada.save();
    return rodada;
}

async function postTaller(data) {
    if (Array.isArray(data.informacion)) {
        data.informacion = data.informacion.map(info => {
            if (info.fecha) {
                const fecha = new Date(info.fecha);
                info.fecha = fecha.toISOString();
            }
            return info;
        });
    }
    const taller = await Taller.create(data);
    await taller.save();
    return taller;
}

async function postEvento(data) {
    if (Array.isArray(data.informacion)) {
        data.informacion = data.informacion.map(info => {
            if (info.fecha) {
                const fecha = new Date(info.fecha);
                info.fecha = fecha.toISOString(); // Convierte a ISO 8601
            }
            return info;
        });
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