const Rodada = require('../../../models/actividades/rodada.model');
const Evento = require('../../../models/actividades/evento.model');
const Taller = require('../../../models/actividades/taller.model');
const { request } = require('express');

const getRodadas = async (request, response) => {
    try {
        const rodadas = await Rodada.find();
        response.status(200).json(rodadas);
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener las rodadas', error });
    }
};

const getEventos = async (request, response) => {
    try {
        const eventos = await Evento.find();
        response.status(200).json(eventos);
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener los eventos', error });
    }
};

const getTalleres = async (request, response) => {
    try {
        const talleres = await Taller.find();
        response.status(200).json(talleres);
    } catch (error) {
        response.status(500).json({ message: 'Error al obtener los talleres', error });
    }
}

module.exports = { getRodadas, getEventos, getTalleres };