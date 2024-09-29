const {
    Usuario
} = require('../../../models/perfil/usuario.model');

exports.actualizarFCM = async (request, response) => {
    const {
        fcmToken
    } = request.body;

    if (!fcmToken) {
        return response.status(400).json({
            message: 'fcmToken es requerido'
        });
    }

    try {
        // Eliminar el token de cualquier otra cuenta que lo tenga registrado
        await Usuario.updateMany({
            fcmTokens: fcmToken
        }, {
            $pull: {
                fcmTokens: fcmToken
            }
        });
        
        // Buscar al usuario por UID
        const user = await Usuario.findOne({
            firebaseUID: request.userUID.uid
        });

        if (user) {
            // Agregar el token si no existe
            if (!user.fcmTokens.includes(fcmToken)) {
                user.fcmTokens.push(fcmToken);
                await user.save();
            }
        }

        response.status(200).json({
            message: 'Token de FCM actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar el token de FCM:', error);
        response.status(500).json({
            message: 'Error al actualizar el token de FCM'
        });
    }
}
