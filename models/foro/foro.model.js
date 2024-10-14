const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foroSchema = new Schema({
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

async function publicarComentario(actividadId, username, fotoPerfil, contenido, respuestaDe = null) {
    const nuevoComentario = await Comentario.create({
        username: username,
        fotoPerfil: fotoPerfil,
        contenido: contenido,
        respuestaDe: respuestaDe
});

await Foro.updateOne(
    { actividad: actividadId },
    { $push: { comentarios: nuevoComentario._id } }
);

return nuevoComentario;
};

module.exports = {
    Foro,
    publicarComentario 
}
