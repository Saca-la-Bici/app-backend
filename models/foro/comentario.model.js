const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
    username: {
        type: String,
        ref: "Usuario",
        required: true
    },
    fotoPerfil: {
        type: String,
        ref: "Usuario",
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

async function publicarComentario(username, fotoPerfil, contenido){
    const nuevoComentario = await Comentario.create({
        username: username,
        fotoPerfil: fotoPerfil,
        contenido: contenido
    });
    await nuevoComentario.save();
    return nuevoComentario;
}

async function eliminarComentario(idComentario){
    const comentario = await Comentario.findByIdAndDelete(idComentario);
    return comentario;
}

module.exports = {
    Comentario,
    publicarComentario,
    eliminarComentario
};