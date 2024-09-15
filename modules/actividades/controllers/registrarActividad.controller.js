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
        Rodada.registrarRodada(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen, ruta);
        res.status(201).json({ message: 'Rodada creada exitosamente.', error });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la rodada', error });
    }

}

exports.postRegistrarTaller = (request, response) => {
    const {
        titulo,
        fechaHora,
        personasInscritas,
        ubicacion,
        descripcion,
        estado,
        duracion,
        imagen
    } = request.body;

    try {
        Taller.registrarTaller(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen);
        res.status(201).json({ message: 'Taller creado exitosamente.', error });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el taller', error });
    }
}

exports.postRegistrarEvento = (request, response) => {
    const {
        titulo,
        fechaHora,
        personasInscritas,
        ubicacion,
        descripcion,
        estado,
        duracion,
        imagen
    } = request.body;

    try {
        Evento.registrarEvento(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen);
        res.status(201).json({ message: 'Evento creado exitosamente.', error });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento', error });
    }
}