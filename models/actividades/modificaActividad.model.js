const { encontrarEvento } = require('./consultarActividadIndividual.model');

async function modificarEvento(id, data) {
    // Checa el tipo de modelo (Rodada, Taller, Evento)
    const { model } = await encontrarEvento(id);

    // Actualización del evento
    const updatedEvent = await model.findByIdAndUpdate(id, data, { new: true });
    return updatedEvent;
}

module.exports = { modificarEvento };
