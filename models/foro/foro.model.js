const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foroSchema = new Schema({
    actividad: {
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    },
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario'
    }]
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

// Método estático para buscar un foro por el ID de la actividad
foroSchema.statics.buscarPorActividadId = async function(actividadId) {
    return await this.findOne({ actividad: actividadId }).exec();
};

// Función para consultar comentarios
foroSchema.statics.consultarComentarios = async function (actividadId) {
    try {
        const foro = await this.findOne({ actividad: actividadId }).populate('comentarios').exec();
        if (!foro) {
            throw new Error('Foro no encontrado');
        }
        return foro.comentarios;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = mongoose.model('Foro', foroSchema);