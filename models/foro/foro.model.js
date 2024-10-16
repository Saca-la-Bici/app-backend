const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const comentarioSchema = require('./comentario.model');

const foroSchema = new Schema({
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    },
    comentarios: {
        type: [comentarioSchema],
        default: [] // Inicializar como un array vacío
    }
}, {
    collection: 'Foro'
});

// Método estático para crear un documento en la colección Foro
foroSchema.statics.crearForo = async function(actividadId) {
    const foroData = {
        actividad: actividadId
    };
    const foro = await this.create(foroData);
    await foro.save();
    return foro;
};

module.exports = mongoose.model('Foro', foroSchema);
