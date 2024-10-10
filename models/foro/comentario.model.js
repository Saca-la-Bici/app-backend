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
    fechaCreacion: {
        type: Date,
        immutable: true,
        default: () => Date.now()
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
    },
    foro: {
        type: Schema.Types.ObjectId,  // Referencia al foro relacionado
        ref: 'Foro',  // Nombre del modelo de foro
        required: true
    }
});

module.exports = mongoose.model('Comentario', comentarioSchema);
