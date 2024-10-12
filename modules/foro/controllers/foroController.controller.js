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

exports.obtenerForoPorIdDeActividad = async (req, res) => {
    try {
        // Obtener el ID de la actividad desde los parámetros de la solicitud
        const actividadId = req.params.id;

        // Buscar el foro que corresponde a la actividad y popular los comentarios
        const foro = await Foro.findOne({ actividad: actividadId })
                            .populate('comentarios')  // Poblar los comentarios
                            .exec();

        // Verificar si se encontró el foro
        if (!foro) {
            return res.status(404).json({ mensaje: 'No se encontró un foro para esta actividad' });
        }

        // Enviar el foro encontrado como respuesta
        res.status(200).json(foro);
    } catch (error) {
        // Manejar el error
        res.status(500).json({ mensaje: 'Error al obtener el foro', error: error.message });
    }
};