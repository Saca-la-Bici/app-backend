const Taller = require('./taller.model');
const Evento = require('./evento.model');
const Rodada = require('./rodada.model');

async function getImagenTaller(id){
    const taller = await Taller.findById(id);
    return taller.imagen;
}

async function getImagenEvento(id){
    const evento = await Evento.findById(id);
    return evento.imagen;
}

async function getImagenRodada(id){
    const rodada = await Rodada.findById(id);
    return rodada.imagen;
}

async function modificarTaller(id, data) {
    // Actualización del evento
    console.log("Modelo antes de guardar:): ", id, data)
    const updatedEvent = await Taller.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

async function modificarEvento(id, data) {
    // Actualización del evento
    const updatedEvent = await Evento.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

async function modificarRodada(id, data) {
    // Actualización del evento
    const updatedEvent = await Rodada.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

module.exports = { 
    getImagenTaller, getImagenEvento, getImagenRodada,
    modificarTaller, modificarEvento, modificarRodada };
