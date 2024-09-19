const mongoose = require('mongoose');
const actividadSchema = require('./actividad.model');

const tallerSchema = new mongoose.Schema ({
    informacion: {
        type: [actividadSchema],
        required: true
    }
}, {
    collection: 'Taller'
});

const taller = mongoose.model('Taller', tallerSchema);

module.exports = taller;