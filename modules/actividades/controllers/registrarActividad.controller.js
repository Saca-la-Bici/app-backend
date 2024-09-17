const { registrarActividad } = require('../../../models/actividades/registraActividad.model.js');

exports.getRegistrarActividad = (request, response) => {
    response.json('Actividad: Esta es la plantilla que deben usar.');
};

exports.postRegistrarActividad = (request, response) => {
    const data = request.body;
    const tipo = request.params.tipo;

    try {
        registrarActividad(tipo, data);
        res.status(201).json({ message: 'Rodada creada exitosamente.', error });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la rodada', error });
    }

}

