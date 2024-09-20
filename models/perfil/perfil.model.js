const mongoose = require('mongoose');

const DatosPerfilSchema = new mongoose.Schema(
    {
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String, 
        required: true
    },
    nombre: {
        type: String, 
        required: true
    },
    tipoSangre: {
        type: String,
        required: false
    },
    correoElectronico: {
        type: String,
        required: true
    },
    numeroEmergencia: {
        type: Number,
        required: false
    },
    fechaRegistro: {
        type: Date,
        required: true
    }
}, {
    collection: 'DatosPerfil'
});

const Perfil = mongoose.model('Usuario', DatosPerfilSchema);





async function putPerfil(IDUsuario, Username, nombre, tipoSangre, numeroEmergencia){
    try {
        const perfil = await Perfil.findById(IDUsuario);
        if (perfil) {
            perfil.username = Username;
            perfil.nombre = nombre
            perfil.tipoSangre = tipoSangre;
            perfil.numeroEmergencia = numeroEmergencia;

            await perfil.save();
            return perfil;
        } else {
            throw new Error('Perfil no encontrado');
        }
    } catch (error) {
        throw error;
    }
}


module.exports = {
    Perfil,
    putPerfil
};