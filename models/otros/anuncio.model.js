const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    IDAnuncio: {
        type: Number,
        unique: true
    },
    IDUsuario: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    contenido: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fechaCaducidad: {
        type: Date,
        default: function() {
            return new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 días después de la fecha actual
        }
    }
});

const Anuncio = mongoose.model('Anuncio', announcementSchema);

async function postAnnouncement(IDUsuario, contenido, imagen){
    try {
        const announcement = await Anuncio.create({
            IDUsuario: IDUsuario,
            contenido: contenido,
            imagen: imagen
        });
        await announcement.save();
    } catch (error) {
        throw error;
    }
}

async function getAnnouncement(IDAnuncio){
    try {
        const announcement = await Anuncio.findById(IDAnuncio);
        return announcement;
    } catch (error) {
        throw error;
    }
}

async function deleteAnnouncement(IDAnuncio){
    try {
        await Anuncio.findByIdAndDelete(IDAnuncio);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    Anuncio,
    postAnnouncement,
    getAnnouncement,
    deleteAnnouncement
};