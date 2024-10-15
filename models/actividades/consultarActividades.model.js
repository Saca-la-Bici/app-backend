const Rodada = require('./rodada.model');
const Evento = require('./evento.model');
const Taller = require('./taller.model');
const moment = require('moment-timezone');

// Obtener la fecha actual en la zona horaria de México
const getFechaConsulta = () => {
    return moment.tz('America/Mexico_City').subtract(6, 'hours').toDate();
};

// Consulta para obtener rodadas
async function getRodadasQuery() {
    const fechaConsulta = getFechaConsulta();
    return await Rodada.find({
        "informacion.estado": true,
        "informacion.fecha_fin": { $gte: fechaConsulta }
    }).sort({ "informacion.fecha": 1 }).populate('ruta'); // Ordenar por fecha ascendente
}

// Consulta para obtener eventos
async function getEventosQuery() {
    const fechaConsulta = getFechaConsulta();
    return await Evento.find({
        "informacion.estado": true,
        "informacion.fecha_fin": { $gte: fechaConsulta }
    }).sort({ "informacion.fecha": 1 }); // Ordenar por fecha ascendente
}

// Consulta para obtener talleres
async function getTalleresQuery() {
    const fechaConsulta = getFechaConsulta();
    return await Taller.find({
        "informacion.estado": true,
        "informacion.fecha_fin": { $gte: fechaConsulta }
    }).sort({ "informacion.fecha": 1 }); // Ordenar por fecha ascendente
}

// Función para actualizar el estado de las actividades
async function actualizarEstadoActividades() {
    const fechaActual = getFechaConsulta();
    const updateQuery = { $set: { "informacion.$[elem].estado": false } };
    const arrayFilters = [{ "elem.fecha_fin": { $lt: fechaActual }, "elem.estado": true }];

    await Rodada.updateMany({}, updateQuery, { arrayFilters });
    await Evento.updateMany({}, updateQuery, { arrayFilters });
    await Taller.updateMany({}, updateQuery, { arrayFilters });
}

module.exports = {
    getRodadasQuery,
    getEventosQuery,
    getTalleresQuery,
    getFechaConsulta,
    actualizarEstadoActividades
};
