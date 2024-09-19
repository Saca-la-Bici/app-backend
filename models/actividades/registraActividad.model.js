const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function encontrarTipo(tipo) {
    if (tipo === 'rodada') return Rodada;
    if (tipo === 'taller') return {model: Taller};
    if (tipo === 'evento') return Evento;
    throw new Error('Tipo de actividad no válido');
}

async function registrarActividad(tipo, data) {
    try {
        console.log("El tipo es: ", tipo);
        if (tipo === 'rodada') {
            const rodada = await Rodada.create(data);
            await rodada.save();
        } else if (tipo === 'taller') {
            console.log("Creando taller");
            const taller = await Taller.create(data);
            console.log("Taller creado");
            await taller.save();
            console.log("Taller guardado");
        } else if (tipo === 'evento') {
            const evento = await Evento.create(data);
            await evento.save();
        } else {
            throw new Error('Tipo de actividad no válido');
        }
    } catch (error) {
        throw(error);
    }
}

module.exports = { registrarActividad };