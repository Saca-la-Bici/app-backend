const Rol = require('../../../models/perfil/rol.model'); 

exports.getAllRoles = async (request, response) => {
    try {
        // Encuentra todos los roles en la colección 'Rol'
        const roles = await Rol.find({});
        // Envía los roles en la respuesta
        response.status(200).json(roles);
    } catch (error) {
        response.status(500).json({ 
            message: 'Error al obtener los roles', 
            error: error.message });
    }
};