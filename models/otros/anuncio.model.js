const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    IDUsuario: {
        type: Number,
        //type: mongoose.SchemaTypes.ObjectId,
        //ref: 'Usuario',
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
});

const Anuncio = mongoose.model('Anuncio', announcementSchema);

async function postAnnouncement(IDUsuario, titulo, contenido, imagen){
    console.log("LLEGAMOS AL MODEL")
    console.log('IDUsuario:', IDUsuario);
    console.log('titulo:', titulo);
    console.log('contenido:', contenido);
    console.log('imagen:', imagen);
    try {
        const announcement = await Anuncio.create({
            IDUsuario: IDUsuario,
            titulo: titulo,
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

async function putAnnouncement(IDAnuncio, IDUsuario, titulo, contenido, imagen){
    try {
        const announcement = await Anuncio.findById(IDAnuncio);
        if (announcement) {
            announcement.IDUsuario = IDUsuario;
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
    putAnnouncement,
    deleteAnnouncement
};