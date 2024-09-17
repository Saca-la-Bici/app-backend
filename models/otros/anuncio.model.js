const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const announcementSchema = new mongoose.Schema({
    IDAnuncio: {
        type: Number,
        unique: true
    },
    IDUsuario: {
        type: Number,
        //type: mongoose.SchemaTypes.ObjectId,
        //ref: 'Usuario',
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

announcementSchema.plugin(AutoIncrement, {inc_field: 'IDAnuncio'}); // Autoincrementa el IDAnuncio

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

async function getAnnouncements(IDAnuncio){
    try {
        const announcements = await Anuncio.find();
        return announcements;
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
    getAnnouncements,
    deleteAnnouncement
};