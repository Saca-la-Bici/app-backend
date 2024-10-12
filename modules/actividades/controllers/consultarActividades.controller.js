const moment = require('moment-timezone');
const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');
const Taller = require('../../../models/actividades/taller.model');
const {
    consultarActividadIndividual
} = require('../../../models/actividades/consultarActividadIndividual.model');
const getImageFolder = require('../../../util/getImageFolder');


const getRodadas = async (request, response) => {
    try {
        const fechaConsulta = getFechaConsulta();

        const rodadas = await Rodada.find({
            "informacion.estado": true,
            "informacion.fecha_fin": { $gte: fechaConsulta }
        }).sort({ "informacion.fecha": 1 }).populate('ruta'); // Ordenar por fecha ascendente

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
        console.log(error.message)
        response.status(500).json({
            message: 'Error al obtener las rodadas',
            error: error.message
        });
    }
};

const getEventos = async (request, response) => {
    try {
        const fechaConsulta = getFechaConsulta();
        const eventos = await Evento.find({
            "informacion.estado": true,
            "informacion.fecha_fin": { $gte: fechaConsulta }
        }).sort({ "informacion.fecha": 1 }); // Ordenar por fecha ascendente

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
        console.log(error.message)
        response.status(500).json({
            message: 'Error al obtener los eventos',
            error: error.message
        });
    }
};

const getTalleres = async (request, response) => {
    try {
        const fechaConsulta = getFechaConsulta();
        const talleres = await Taller.find({
            "informacion.estado": true,
            "informacion.fecha_fin": { $gte: fechaConsulta}
        }).sort({ "informacion.fecha": 1 }); // Ordenar por fecha ascendente

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

const getActividad = async (request, response) => {
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

// Obtener la fecha actual en la zona horaria de México
const getFechaConsulta = () => {
    return moment.tz('America/Mexico_City').subtract(6, 'hours').toDate(); 
};

module.exports = { getRodadas, getEventos, getTalleres, getActividad };