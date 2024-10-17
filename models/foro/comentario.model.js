const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getFechaConsulta } = require('../actividades/consultarActividades.model');

const comentarioSchema = new Schema({
    firebaseUID: {
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
    fecha: {
        type: Date,
        default: getFechaConsulta,
        immutable: true
    },
    modificacion: {
        type: Boolean,
        default: false
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

module.exports = Comentario;

// Función para modificar comentario
module.exports.modificarComentario = async function(IDComentario, contenido) {
    try {
        if (!mongoose.Types.ObjectId.isValid(IDComentario)) {
            throw new Error('IDComentario no es válido');
        }

        const comentario = await Comentario.findById(IDComentario);
        if (comentario) {
            comentario.contenido = contenido;
            comentario.modificacion = true;
            await comentario.save();
            return comentario;
        } else {
            throw new Error('Comentario no encontrado');
        }
    } catch (error) {
        console.error(`Error al modificar el comentario: ${error.message}`);
        throw error;
    }
};
