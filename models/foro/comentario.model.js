const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getFechaConsulta } = require('../actividades/consultarActividades.model');

const comentarioSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fotoPerfil: {
        type: String,
        required: false
    },
    contenido: {
        type: String,
        minLength: 4,
        maxLength: 255,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: getFechaConsulta,
        immutable: true
    },
    fechaModificacion: {
        type: Date,
        default: getFechaConsulta
    },
    likes: {
        type: Number,
        default: 0
    },
    respuestaDe: {
        type: Schema.Types.ObjectId,
        ref: 'Comentario',
        default: null
    }
});

module.exports = comentarioSchema;