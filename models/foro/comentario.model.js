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
        maxLength: 500,
        required: true
    },
    fechaCreacion: {
        type: Date,
        immutable: true,
        default: Date.now
    },
    fechaModificacion: {
        type: Date,
        default: Date.now
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

const Comentario = mongoose.model('Comentario', comentarioSchema);

async function eliminarComentario(idComentario){
    const comentario = await Comentario.findByIdAndDelete(idComentario);
    return comentario;
}

module.exports = {
    Comentario,
    eliminarComentario
};