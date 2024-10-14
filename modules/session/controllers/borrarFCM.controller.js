const {
    Usuario
} = require('../../../models/perfil/usuario.model');

exports.eliminarFCM = async (request, response) => {
    const { fcmToken } = request.body;

    if (!fcmToken) {
        return response.status(400).json({
            message: 'fcmToken es requerido'
        });
    }

    try {
        // Buscar al usuario por UID
        const user = await Usuario.findOne({
            firebaseUID: request.userUID.uid
        });

        if (user) {
            // Verificar si el token existe en el array y eliminarlo
            if (user.fcmTokens.includes(fcmToken)) {
                user.fcmTokens = user.fcmTokens.filter(token => token !== fcmToken);
                await user.save();
            }
        }

        response.status(200).json({
            message: 'Token de FCM eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar el token de FCM:', error);
        response.status(500).json({
            message: 'Error al eliminar el token de FCM'
        });
    }
}