const mongoose = require('mongoose');
const Foro = require('../../../models/foro/foro.model');

exports.crearForo = async (req, res) => {
    try {
        const { titulo, descripcion, actividad } = req.body;

        // Validar que los campos obligatorios estén presentes
        if (!titulo || !descripcion || !actividad) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Crear una nueva instancia del modelo Foro
        const nuevoForo = new Foro({
            titulo,
            descripcion,
            actividad
        });

        // Guardar el foro en la base de datos
        const foroGuardado = await nuevoForo.save();

        // Enviar respuesta exitosa
        res.status(201).json(foroGuardado);
    } catch (error) {
        // Manejar el error
        res.status(500).json({ mensaje: 'Error al crear el foro', error: error.message });
    }
};
