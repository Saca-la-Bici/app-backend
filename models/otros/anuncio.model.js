const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        ref: 'Usuario',
        required: true,
    },
    titulo:{
        type: String,
        required: true
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
}, {
    collection: "Anuncio",
});


const Anuncio = mongoose.model('Anuncio', announcementSchema);


async function postAnnouncement(firebaseUID, titulo, contenido, imagen){
    const announcement = await Anuncio.create({
        firebaseUID: firebaseUID,
        titulo: titulo,
        contenido: contenido,
        imagen: imagen
    });
    await announcement.save();
    return announcement;
}

async function getAnnouncements(){
    const announcements = await Anuncio.find();
    return announcements;
}

async function putAnnouncement(IDAnuncio, titulo, contenido, imagen){
    try {
        const announcement = await Anuncio.findById(IDAnuncio);
        if (announcement) {
            announcement.titulo = titulo;
            announcement.contenido = contenido;
            announcement.imagen = imagen;
            await announcement.save();
            return announcement;
        } else {
            throw new Error('Anuncio no encontrado');
        }
    } catch (error) {
        throw error;
    }
}

async function deleteAnnouncement(IDAnuncio){
    await Anuncio.findByIdAndDelete(IDAnuncio);
}

async function getImagen(IDAnuncio){
    const announcement = await Anuncio.findById(IDAnuncio);
    return announcement.imagen;
}

module.exports = {
    Anuncio,
    postAnnouncement,
    getAnnouncements,
    putAnnouncement,
    deleteAnnouncement,
    getImagen
};