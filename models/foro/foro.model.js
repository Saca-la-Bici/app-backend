const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comentarioSchema = require('../foro/comentario.model');

const foroSchema = new Schema({
    comentarios: {
        type: [comentarioSchema],
        default: []
    }
}, {
    collection: 'Foro'
});

module.exports = mongoose.model('Foro', foroSchema);