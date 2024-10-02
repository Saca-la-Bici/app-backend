// iniciarRodada.controller.js

// Simulación de una base de datos en memoria para almacenar la ubicación
let ubicacionAdmin = null;

// Controlador para iniciar la rodada
exports.iniciarRodada = (req, res) => {
    const { rutaId, adminId } = req.body;

    // Validar que se reciban ambos parámetros
    if (!rutaId || !adminId) {
        return res.status(400).json({ error: 'Faltan parámetros rutaId o adminId.' });
    }

    // Aquí puedes agregar lógica adicional para validar la ruta y administrador, o iniciar la rodada en la base de datos

    // Responder con éxito
    res.status(200).json({ message: 'Rodada iniciada con éxito', rutaId, adminId });
};

// Controlador para actualizar la ubicación del administrador
exports.actualizarUbicacion = (req, res) => {
    const { latitud, longitud, adminId } = req.body;

    // Validar los parámetros de ubicación
    if (!latitud || !longitud || !adminId) {
        return res.status(400).json({ error: 'Faltan parámetros de ubicación o adminId.' });
    }

    // Actualizar la ubicación del administrador en la "base de datos" (aquí es solo en memoria)
    ubicacionAdmin = { latitud, longitud, adminId };

    // Responder con un mensaje de éxito
    res.status(200).json({ message: 'Ubicación actualizada con éxito', ubicacion: ubicacionAdmin });
};

// Controlador para obtener la ubicación actual del administrador
exports.obtenerUbicacion = (req, res) => {
    // Verificar si la ubicación ha sido registrada
    if (!ubicacionAdmin) {
        return res.status(404).json({ error: 'No hay ubicación del administrador disponible.' });
    }

    // Responder con la ubicación actual del administrador
    res.status(200).json({ ubicacion: ubicacionAdmin });
};
