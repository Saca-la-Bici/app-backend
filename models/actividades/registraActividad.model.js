const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function postRodada(data, id) {
    try {
        const rodada = await Rodada.create(data);
        rodada.ruta = id;
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

async function registrarActividad(tipo, data) {
    try {
        console.log("El tipo es: ", tipo);
        if (tipo === 'rodada') {
            const rodada = await Rodada.create(data);
            await rodada.save();
            return rodada;

        } else if (tipo === 'taller') {
            console.log("Creando taller");
            const taller = await Taller.create(data);
            console.log("Taller creado");
            await taller.save();
            console.log("Taller guardado");
            return taller;

        } else if (tipo === 'evento') {
            const evento = await Evento.create(data);
            await evento.save();
            return evento;
            
        } else {
            throw new Error('Tipo de actividad no válido');
        }
    } catch (error) {
        throw(error);
    }
}

module.exports = { 
    registrarActividad,
    postRodada,
    postTaller,
    postEvento
};