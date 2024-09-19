const mongoose = require('mongoose');

const ContienePrivilegioSchema = new mongoose.Schema({
    IDPrivilegio: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Privilegio"
    },
    IDRol: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Rol"
    }
}, {
    collection: 'Contiene'
});

const ContienePrivilegio = mongoose.model('ContienePrivilegio', ContienePrivilegioSchema);

module.exports = ContienePrivilegio;