const { getImagenTaller, getImagenEvento, getImagenRodada,
    modificarTaller, modificarEvento, modificarRodada 
} = require('../../../models/actividades/modificaActividad.model.js');

const { upload, uploadToS3 } = require("../../../util/uploadImage");
const deleteImage = require("../../../util/deleteImage");

const folderEventos = 'eventos/';
const folderRodadas = 'rodadas/';
const folderTalleres = 'talleres/';


exports.patchTaller = [
  upload.single("file"),
  uploadToS3(folderTalleres),
  async (request, response) => {
    const id = request.query.id;
    const data = request.body;

    data.informacion.imagen = request.file ? request.file.filename : null;
    data.informacion.personasInscritas = parseInt(data.informacion.personasInscritas);
    data.informacion.estado = data.informacion.estado === 'true';

    if (Array.isArray(data.usuariosInscritos)) {
        data.informacion.usuariosInscritos = data.usuariosInscritos.map(usuario => usuario.toString());
    } else {
        data.informacion.usuariosInscritos = [data.usuariosInscritos];
    }

    try {
        const imagenVieja = getImagenTaller(id);
        const updatedActivity = await modificarTaller(id, data);

        deleteImage(folderTalleres, imagenVieja);
        response.status(201).json({ message: 'Actividad modificada exitosamente.', updatedActivity });
    } catch (error) {
        response.status(500).json({ message: 'Error al modificar la actividad', error });
    }
  }
];

exports.patchEvento = [
    upload.single("file"),
    uploadToS3(folderEventos),
    async (request, response) => {
        const id = request.query.id;
        const data = request.body;

        data.informacion.imagen = request.file ? request.file.filename : null;
        data.informacion.personasInscritas = parseInt(data.informacion.personasInscritas);
        data.informacion.estado = data.informacion.estado === 'true';

        if (Array.isArray(data.usuariosInscritos)) {
            data.informacion.usuariosInscritos = data.usuariosInscritos.map(usuario => usuario.toString());
        } else {
            data.informacion.usuariosInscritos = [data.usuariosInscritos];
        }

        try {
            const imagenVieja = await getImagenEvento(id);
            const updatedActivity = await modificarEvento(id, data);
    
            deleteImage(folderEventos, imagenVieja);
            response.status(201).json({ message: 'Actividad modificada exitosamente.', updatedActivity });
        } catch (error) {
            response.status(500).json({ message: 'Error al modificar la actividad', error });
        }
        }
  
];

exports.patchRodada = [
    upload.single("file"),
    uploadToS3(folderRodadas),
    async (request, response) => {
        const id = request.query.id;
        const data = request.body;

        data.informacion.imagen = request.file ? request.file.filename : null;
        data.informacion.personasInscritas = parseInt(data.informacion.personasInscritas);
        data.informacion.estado = data.informacion.estado === 'true';

        if (Array.isArray(data.usuariosInscritos)) {
            data.informacion.usuariosInscritos = data.usuariosInscritos.map(usuario => usuario.toString());
        } else {
            data.informacion.usuariosInscritos = [data.usuariosInscritos];
        }

        try {
            const imagenVieja = await getImagenRodada(id);
            const updatedActivity = await modificarRodada(id, data);
    
            deleteImage(folderRodadas, imagenVieja);
            response.status(201).json({ message: 'Actividad modificada exitosamente.', updatedActivity });
        } catch (error) {
            response.status(500).json({ message: 'Error al modificar la actividad', error });
        }
    }
];
