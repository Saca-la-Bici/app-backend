const {
    getRodadasQuery,
    getEventosQuery,
    getTalleresQuery
} = require('../../../models/actividades/consultarActividades.model');
const {
    consultarActividadIndividual
} = require('../../../models/actividades/consultarActividadIndividual.model');
const getImageFolder = require('../../../util/getImageFolder');


exports.getRodadas = async (request, response) => {
    try {
        const rodadas = await getRodadasQuery();

        request.rodadas = rodadas.map(rodada => rodada.informacion).flat();

        const folder = 'rodadas/';
        const informacionImagen = await getImageFolder(request, folder);

        // Reasignar la informacion actualizada con las imágenes a los eventos originales
        rodadas.forEach((rodada, index) => {
            rodada.informacion = informacionImagen[index];
        });

        response.status(200).json({
            rodadas: rodadas,
            permisos: request.permisos
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: 'Error al obtener las rodadas',
            error: error.message
        });
    }
};

exports.getEventos = async (request, response) => {
    try {
        const eventos = await getEventosQuery();

        request.eventos = eventos.map(evento => evento.informacion).flat();

        const folder = 'eventos/';
        const informacionImagen = await getImageFolder(request, folder);

        // Reasignar la informacion actualizada con las imágenes a los eventos originales
        eventos.forEach((evento, index) => {
            evento.informacion = informacionImagen[index];
        });

        response.status(200).json({
            eventos: eventos,
            permisos: request.permisos
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).json({
            message: 'Error al obtener los eventos',
            error: error.message
        });
    }
};

exports.getTalleres = async (request, response) => {
    try {
        const talleres = await getTalleresQuery();

        request.talleres = talleres.map(taller => taller.informacion).flat();

        const folder = 'talleres/';
        const informacionImagen = await getImageFolder(request, folder);

        // Reasignar la informacion actualizada con las imágenes a los eventos originales
        talleres.forEach((taller, index) => {
            taller.informacion = informacionImagen[index];
        });

        response.status(200).json({
            talleres: talleres,
            permisos: request.permisos
        });
    } catch (error) {
        response.status(500).json({
            message: 'Error al obtener los talleres',
            error
        });
    }
};

exports.getActividad = async (request, response) => {
    const id = request.query.id;

    try {
        const actividad = await consultarActividadIndividual(id);

        if (!actividad || !actividad.informacion || actividad.informacion.length === 0) {
            throw new Error('No se encontraron detalles de la actividad');
        }

        const tipoActividad = actividad.informacion[0].tipo;

        const folderMapping = {
            'Rodada': 'rodadas/',
            'Evento': 'eventos/',
            'Taller': 'talleres/',
        };

        const folder = folderMapping[tipoActividad];
        if (!folder) {
            throw new Error(`Tipo de actividad desconocido: ${tipoActividad}`);
        }

        const requestData = { [folder.slice(0, -1)]: [actividad.informacion[0]] };

        const informacionImagen = await getImageFolder(requestData, folder);

        actividad.informacion[0].imagenUrl = informacionImagen[0].imagen;

        response.status(200).json({
            actividad: actividad,
            permisos: request.permisos
        });
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al obtener la actividad', 
            error: error.message || error 
        });
    }
};