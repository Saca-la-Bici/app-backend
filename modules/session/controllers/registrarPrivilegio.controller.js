const Privilegio = require('../../../models/perfil/privilegio.model');

exports.registrarPrivilegio = async (request, response) => {
    try {
        // Sacar los datos del body (un array de nombres de privilegios)
        const nombres = request.body.nombre;

        // Crear los privilegios para pasarlos a un array
        const privilegiosArray = nombres.map(nombre => ({
            nombre
        }));

        // Insertar todos los privilegios
        const nuevosPrivilegios = await Privilegio.insertMany(privilegiosArray);

        response.status(201).json({
            message: 'Privilegios registrados con éxito',
            privilegios: nuevosPrivilegios
        });

    } catch (error) {
        response.status(400).json({
            error: error.message
        });
    }
};