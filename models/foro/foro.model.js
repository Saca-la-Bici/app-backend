const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foroSchema = new Schema({
    comentarios: [{
        type: Schema.Types.ObjectId,
        ref: 'Comentario',
        default: []
    }]
}, {
    collection: 'Foro'
});

module.exports = mongoose.model('Foro', foroSchema);
