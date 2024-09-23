const { registrarActividad } = require('../../../models/actividades/registraActividad.model.js');

exports.getRegistrarActividad = (request, response) => {
    response.json('Actividad: Esta es la plantilla que deben usar.');
};

exports.postRegistrarActividad = async (request, response) => {
    const data = request.body;
    const tipo = request.params.tipo;
    console.log("El tipo es:", tipo);
    console.log("Los datos son:", data);

    try {
        const registro = await registrarActividad(tipo, data);
        response.status(201).json({ message: `${tipo} creada exitosamente.`, registro });
    } catch (error) {
        response.status(500).json({ message: `Error al crear la ${tipo}`, error });
    }

}

