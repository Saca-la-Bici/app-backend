const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actividad = require('./actividad.model');

const tallerSchema = new Schema ({
    informacion: [{
        type: Schema.Types.ObjectId,
        ref: 'Actividad',
        required: true
    }]
}, {
    collection: 'Talleres'
});

const Taller = mongoose.model('Taller', tallerSchema);

module.exports = Taller;