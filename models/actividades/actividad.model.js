const mongoose = require('mongoose');
const {rutaSchema, coordenadaSchema} = require('../ruta/ruta.model');

const actividadSchema = new mongoose.Schema ({
    titulo: {
        type: String, 
        required: true
    }, 
    fechaHora: {
        type: Date, 
        required: true
    }, 
    //num de personas que atenderan, el default comienza en 0
    personasInscritas: {
        type: Number, 
        required: true,
        default: 0
    },
    //lista de usuarios inscritos para poder validar cuando ya está inscrito un usuario
    usuariosInscritos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' // Referencia al modelo de Usuario
    }],
    ubicacion: {
        type: [coordenadaSchema],
        required: true
    },
    // Incluye materiales requeridos para actividad
    descripcion: {
        type: String, 
        required: true
    }, 
    estado: {
        type: Boolean, 
        required: true
    },
    duracion: {
        type: Number, 
        required: true
    },
    imagen: {
        type: String,
        required: false
    }
});


//------- descomente la sig linea pero no entiendo muy bien pq estaba comentada atte mvp ------------
/*
Al no tener esa línea activa, no podrías interactuar con la colección actividades en MongoDB, ya que el esquema por sí 
solo no permite realizar operaciones CRUD. Descomentando la línea, creas el modelo Actividad, que es lo que usas para 
interactuar con los datos reales en la base de datos.

En resumen, esta línea conecta tu aplicación con la colección real de MongoDB para poder trabajar con los datos de manera 
eficiente.
*/
const actividad = mongoose.model('Actividad', actividadSchema);
//----------------------------------------------------------------------------------------

module.exports = actividadSchema;