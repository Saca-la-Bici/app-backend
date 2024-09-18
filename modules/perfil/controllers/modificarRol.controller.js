const Usuario = require('../../../usuario/models/usuario.model');
const Rol = require('../../../rol/models/rol.model');

async function modificarRol(req, res) {
    const { id } = req.params;
    const { rolId } = req.body;

    try {
        //Declaración de constantes
        const usuario = await Usuario.findByIdAndUpdate(id, { rolId }, { new: true });
        const rol = await Rol.findById(rolId);

        //Validación de existencia de usuario y rol
        if (!usuario) throw new Error ('Usuario no encontrado');
        if (!rol) throw new Error ('Rol no encontrado');
        
        //Asignación y guardado de rol al usuario
        usuario.rol = rol;
        await usuario.save();

        return usuario;
    } catch (error) {
        throw new Error ('Error al cambiar el rol: ' + error.message);

    }
}