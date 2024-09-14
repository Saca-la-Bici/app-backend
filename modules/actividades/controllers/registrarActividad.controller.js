const {Rodada, Taller, Evento} = require('../../../models/actividades/registraActividad.model.js');

exports.getRegistrarActividad = (request, response) => {
    response.json('Actividad: Esta es la plantilla que deben usar.');
};

exports.postRegistrarRodada = (request, response) => {
    const {
        titulo,
        fechaHora,
        personasInscritas,
        ubicacion,
        descripcion,
        estado,
        duracion,
        imagen,
        ruta
    } = request.body;

    try {
        Actividad.registrarActividad(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen, ruta);
        res.status(201).json(nuevaRodada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la rodada', error });
    }

}
