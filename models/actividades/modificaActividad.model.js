const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function encontrarEvento(id) {

    // Encontrar el tipo de evento por colección
    let event = await Rodada.findById(id);
    if (event) return { model: Rodada, event };

    event = await Taller.findById(id);
    if (event) return { model: Taller, event };

    event = await Evento.findById(id);
    if (event) return { model: Evento, event };

    
    throw new Error('No se encontró ninguna actividad con este ID.');
}

async function modificarEvento(id, data) {
    try {
        // Checa el tipo de modelo (Rodada, Taller, or Evento)
        const { model } = await encontrarEvento(id);

        // Actualización del evento
        const updatedEvent = await model.findByIdAndUpdate(id, data, { new: true });
        return updatedEvent;
    } catch (error) {
        throw error;
    }
}

module.exports = { modificarEvento };
