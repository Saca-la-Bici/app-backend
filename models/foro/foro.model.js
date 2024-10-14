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

module.exports = mongoose.model('Foro', foroSchema);
