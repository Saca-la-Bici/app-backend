const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    fotoPerfil: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        minLength: 4,
        maxLength: 255,
        required: true
    },
    foro: {
        type: Schema.Types.ObjectId,  // Referencia al foro
        ref: 'Foro',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    fechaModificacion: {
        type: Date,
        default: () => Date.now()
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

module.exports = mongoose.model('Comentario', comentarioSchema);
