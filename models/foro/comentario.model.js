const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        default: () => new Date(),
        immutable: true
    },
    fechaModificacion: {
        type: Date,
        default: () => new Date()
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
}, {
    collection: 'Comentario'
});

module.exports = mongoose.model('Comentario', comentarioSchema);
