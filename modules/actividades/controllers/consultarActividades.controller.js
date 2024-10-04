const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');
const Taller = require('../../../models/actividades/taller.model');
const { consultarActividadIndividual } = require('../../../models/actividades/consultarActividadIndividual.model');

const getRodadas = async (request, response) => {
    try {
        const rodadas = await Rodada.find({ "informacion.estado": true }).populate('ruta');
        response.status(200).json({
            rodadas: rodadas,
            permisos: request.permisos
            });
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener las rodadas', error });
    }
};

const getEventos = async (request, response) => {
    try {
        const eventos = await Evento.find({ "informacion.estado": true });
        
        
        response.status(200).json({
            eventos: eventos,
            permisos: request.permisos
        });
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};

const getTalleres = async (request, response) => {
    try {
        const talleres = await Taller.find({ "informacion.estado": true });
        response.status(200).json({
            talleres: talleres, 
            permisos: request.permisos
        });
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener los talleres', error });
    }
}

const getActividad = async (request, response) => {
    const id = request.query.id;
    try {
        const actividad = await consultarActividadIndividual(id);
        response.status(200).json({
            actividad: actividad, 
            permisos: request.permisos
        });
    } catch (error) {
        return response.status(500).json({ message: 'Error al obtener la actividad', error });
    }
}

module.exports = { getRodadas, getEventos, getTalleres, getActividad };