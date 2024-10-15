const { encontrarEvento, consultarActividadIndividual } = require('./consultarActividadIndividual.model');

async function eliminarActividadModel(id) {
    // Checa el tipo de modelo (Rodada, Taller, Evento)
    const { model } = await encontrarEvento(id);

    // Obtenemos la información de la actividad
    const data = await consultarActividadIndividual(id);

    // Actualizar el campo `informacion: [{estado}]` a false
    data.informacion[0].estado = false;

    const deletedEvent = await model.findByIdAndUpdate(id, data, { new: true });
    return deletedEvent;
}

module.exports = { eliminarActividadModel };
