const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foroSchema = new Schema({
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario',
        default: []
    }],
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    },
    comentarios: [{
        type: Schema.Types.ObjectId,  // Referencia a los comentarios
        ref: 'Comentario'
    }],
    fechaCreacion: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
}, {
    collection: 'Foros'
});

Foro = mongoose.model('Foro', foroSchema);

async function eliminarComentario(idComentario) {
    await Comentario.deleteMany({ respuestaDe: idComentario });

    const comentarioEliminado = await Comentario.findByIdAndDelete(idComentario);
    return comentarioEliminado;
}

module.exports = {
    Foro,
    eliminarComentario
};
