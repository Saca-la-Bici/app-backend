const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function postRodada(data, id) {
    try {
        const rodada = await Rodada.create(data);

        let _ruta = Rodada.findById(id);
        rodada.ruta = _ruta;

        await rodada.save();
        return rodada;
    } catch (error) {
        throw(error);
    }
}

async function postTaller(data) {
    try {
        const taller = await Taller.create(data);
        await taller.save();
        return taller;
    } catch (error) {
        throw(error);
    }
}

async function postEvento(data) {
    try {
        const evento = await Evento.create(data);
        await evento.save();
        return evento;
    } catch (error) {
        throw(error);
    }
}

module.exports = { 
    postRodada,
    postTaller,
    postEvento
};