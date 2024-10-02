const { 
    postRodada,
    postTaller,
    postEvento
} = require('../../../models/actividades/registraActividad.model.js');

const {
    upload,
    uploadToS3
} = require('../../../util/uploadImage');

const folderEventos = 'actividades/eventos/';
const folderRodadas = 'actividades/rodadas/';
const folderTalleres = 'actividades/talleres/';

exports.postRodada = [
    upload.single('file'),
    uploadToS3(folderRodadas),
    async (request, response) => {
        const data = request.body;

        data.informacion.imagen = request.file ? request.file.filename : null;

        try {
            const registro = await postRodada(data);
            response.status(201).json({
                message: `Rodada creada exitosamente.`,
                registro
            });
        } catch (error) {
            response.status(500).json({
                message: `Error al crear la rodada`,
                error: error.message
            });
        }
    }
];

exports.postTaller = [
    upload.single('file'),
    uploadToS3(folderTalleres),
    async (request, response) => {
        const data = request.body;

        data.informacion.imagen = request.file ? request.file.filename : null;

        try {
            const registro = await postTaller(data);
            response.status(201).json({
                message: `Taller creado exitosamente.`,
                registro
            });
        } catch (error) {
            response.status(500).json({
                message: `Error al crear el taller`,
                error: error.message
            });
        }
    }
];

exports.postEvento = [
    upload.single('file'),
    uploadToS3(folderEventos),
    async (request, response) => {
        const data = request.body;

        data.informacion.imagen = request.file ? request.file.filename : null;

        try {
            const registro = await postEvento(data);
            response.status(201).json({
                message: `Evento creado exitosamente.`,
                registro
            });
        } catch (error) {
            response.status(500).json({
                message: `Error al crear el evento`,
                error: error.message
            });
        }
    }
];