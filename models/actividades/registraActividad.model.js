const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function registrarRodada(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen, ruta) {
    try {
        const rodada = await Rodada.create({
            titulo: titulo,
            fechaHora: fechaHora,
            personasInscritas: personasInscritas,
            ubicacion: ubicacion,
            descripcion: descripcion,
            estado: estado,
            duracion: duracion,
            imagen: imagen, 
            ruta: ruta
        });
        await rodada.save();

    } catch (error) {
        throw(error);
    }
}

async function registrarTaller(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen) {
    try {
        const taller = await Taller.create({
            titulo: titulo,
            fechaHora: fechaHora,
            personasInscritas: personasInscritas,
            ubicacion: ubicacion,
            descripcion: descripcion,
            estado: estado,
            duracion: duracion,
            imagen: imagen
        });
        await taller.save();

    } catch (error) {
        throw(error);
    }
}

async function registrarEvento(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen) {
    try {
        const evento = await Evento.create({
            titulo: titulo,
            fechaHora: fechaHora,
            personasInscritas: personasInscritas,
            ubicacion: ubicacion,
            descripcion: descripcion,
            estado: estado,
            duracion: duracion,
            imagen: imagen
        });
        await evento.save();

    } catch (error) {
        throw(error);
    }
}

module.exports = {
    registrarRodada,
    registrarTaller,
    registrarEvento
}