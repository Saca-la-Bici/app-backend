const mongoose = require('mongoose');

const medallasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
}, {
    collection: 'Medallas'
});


const Medalla = mongoose.model('Medalla', medallasSchema);


module.exports = Medalla;