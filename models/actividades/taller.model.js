const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actividad = require('./actividad.model');

const tallerSchema = new Schema ({
    informacion: {
        type: Actividad.schema,
        required: true
    }
}, {
    collection: 'Taller'
});

const Taller = mongoose.model('Taller', tallerSchema);

module.exports = Taller;