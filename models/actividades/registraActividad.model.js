const moment = require('moment');
const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');
const Foro = require('../foro/foro.model'); 

// Función para limpiar y concatenar fecha y hora, y sumar duración
const procesarFechaHora = (fecha, hora, duracion) => {
    const fechaLimpia = fecha.replace(/^"|"$/g, "");
    const horaLimpia = hora.replace(/^"|"$/g, "");
    const duracionLimpia = duracion.replace(/^"|"$/g, "");

    // Parsear la duración
    const duracionMatch = duracionLimpia.match(/(\d+)\s*horas?\s*(\d+)?\s*minutos?/);
    const horas = duracionMatch ? parseInt(duracionMatch[1], 10) : 0;
    const minutos = duracionMatch && duracionMatch[2] ? parseInt(duracionMatch[2], 10) : 0;

    // Crear un objeto moment con la fecha y hora
    let fechaHora = moment(`${fechaLimpia}T${horaLimpia}:00.000Z`);

    // Sumar la duración para obtener fecha_fin
    let fechaFin = fechaHora.clone().add(horas, 'hours').add(minutos, 'minutes');

    return {
        fechaInicio: fechaHora.toDate(),
        fechaFin: fechaFin.toDate()
    };
};

async function postRodada(data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }
    const rodada = await Rodada.create(data);
    await rodada.save();

    // Crear un documento en la colección Foro 
    await Foro.crearForo(rodada._id);
    console.log("Foro creado para la rodada con ID:", rodada._id);

    return rodada;
}

async function postTaller(data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }

    const taller = await Taller.create(data);
    await taller.save();

    // Crear un documento en la colección Foro 
    await Foro.crearForo(taller._id);

    return taller;
}

async function postEvento(data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }
    const evento = await Evento.create(data);
    await evento.save();

    // Crear un documento en la colección Foro 
    await Foro.crearForo(evento._id);

    return evento;
}

module.exports = { 
    postRodada,
    postTaller,
    postEvento,
    procesarFechaHora
};