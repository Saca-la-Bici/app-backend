const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comentarioSchema = require('./comentario.model');

// Definir el esquema de Foro
const foroSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: () => Date.now()
    },
    comentarios: {
        type: [comentarioSchema],
        default: []
    },
    actividad: {
        type: Schema.Types.ObjectId,  // Referencia a la actividad relacionada
        ref: 'Actividad',  // Nombre del modelo de actividad
        required: true
    }
}, {
    collection: 'Foros'
});

// Crear y exportar el modelo Foro
module.exports = mongoose.model('Foro', foroSchema);
