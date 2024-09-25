const { 
    registrarActividad,
    postRodada,
    postTaller,
    postEvento
} = require('../../../models/actividades/registraActividad.model.js');

exports.postRodada = async (request, response) => {
    const data = request.body;
    const {id} = request.query;

    console.log("Los datos son:", data);
    console.log("El id de la ruta es:", id);

    try {
        const registro = await postRodada(data, id);
        response.status(201).json({ message: `Rodada creada exitosamente.`, registro });
    } catch (error) {
        response.status(500).json({ message: `Error al crear la rodada`, error });
    }
}

exports.postTaller = async (request, response) => {
    const data = request.body;
    console.log("Los datos son:", data);

    try {
        const registro = await postTaller(data);
        response.status(201).json({ message: `Taller creado exitosamente.`, registro });
    } catch (error) {
        response.status(500).json({ message: `Error al crear el taller`, error });
    }
}

exports.postEvento = async (request, response) => {
    const data = request.body;
    console.log("Los datos son:", data);

    try {
        const registro = await postEvento(data);
        response.status(201).json({ message: `Evento creado exitosamente.`, registro });
    } catch (error) {
        response.status(500).json({ message: `Error al crear el evento`, error });
    }
}