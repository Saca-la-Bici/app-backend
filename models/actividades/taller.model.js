const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actividad = require('./actividad.model');

const tallerSchema = new Schema ({
    actividad: {
        type: Actividad.schema,
        required: true
    }
}, {
    collection: 'Talleres'
});

const Taller = mongoose.model('Taller', tallerSchema);

module.exports = Taller;