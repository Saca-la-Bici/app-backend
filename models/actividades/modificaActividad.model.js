const Taller = require('./taller.model');
const Evento = require('./evento.model');
const Rodada = require('./rodada.model');
const moment = require('moment');

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

const reemplazarComillas = (data) => {
    data.informacion.titulo = data.informacion.titulo.replace(/^"|"$/g, '');
    data.informacion.fecha = data.informacion.fecha.replace(/^"|"$/g, '');
    data.informacion.hora = data.informacion.hora.replace(/^"|"$/g, '');
    data.informacion.ubicacion = data.informacion.ubicacion.replace(/^"|"$/g, '');
    data.informacion.descripcion = data.informacion.descripcion.replace(/^"|"$/g, '');
    data.informacion.duracion = data.informacion.duracion.replace(/^"|"$/g, '');
    data.informacion.tipo = data.informacion.tipo.replace(/^"|"$/g, '');
    data.informacion.foro = data.informacion.foro.replace(/^"|"$/g, '');
    data.informacion.personasInscritas = data.informacion.personasInscritas.replace(/^"|"$/g, '');
    data.informacion.estado = data.informacion.estado.replace(/^"|"$/g, '');

    return data;
}

async function getImagenTaller(id){
    const taller = await Taller.findById(id);
    return taller.informacion.imagen;
}

async function getImagenEvento(id){
    const evento = await Evento.findById(id);
    return evento.informacion.imagen;
}

async function getImagenRodada(id){
    const rodada = await Rodada.findById(id);
    return rodada.informacion.imagen;
}

async function modificarTaller(id, data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }

    const updatedEvent = await Taller.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

async function modificarEvento(id, data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }

    const updatedEvent = await Evento.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

async function modificarRodada(id, data) {
    if (data.informacion.fecha && data.informacion.hora && data.informacion.duracion) {
        const fechas = procesarFechaHora(data.informacion.fecha, data.informacion.hora, data.informacion.duracion);
        data.informacion.fecha = fechas.fechaInicio;
        data.informacion.fecha_fin = fechas.fechaFin;
    }

    const updatedEvent = await Rodada.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

module.exports = { 
    reemplazarComillas,
    getImagenTaller, getImagenEvento, getImagenRodada,
    modificarTaller, modificarEvento, modificarRodada };
