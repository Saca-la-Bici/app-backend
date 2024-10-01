const admin = require('./firebase-admin-config');
const { 
    Usuario 
} = require('../models/perfil/usuario.model'); 

const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
};

const sendNotification = async (tokens, titulo, cuerpo, data = {}) => {
    if (!tokens || tokens.length === 0) {
        console.log('No hay tokens de FCM para enviar notificaciones.');
        return;
    }

    // Dividir los tokens en grupos de 500 como máximo
    const tokenChunks = chunkArray(tokens, 500);

    try {
        for (const chunk of tokenChunks) {
            const responses = await admin.messaging().sendEachForMulticast({
                tokens: chunk,
                notification: {
                    title: titulo,
                    body: cuerpo,
                },
                data: data
            });

            let successCount = 0;
            let failureCount = 0;
            const failedTokens = [];

            responses.responses.forEach((response, index) => {
                if (response.success) {
                    successCount++;
                } else {
                    failureCount++;
                    const failedToken = chunk[index];
                    console.error(`Error al enviar a ${failedToken}: ${response.error.message}`);
                    if (
                        response.error.code === 'messaging/invalid-registration-token' ||
                        response.error.code === 'messaging/registration-token-not-registered'
                    ) {
                        failedTokens.push(failedToken);
                    }
                }
            });

            console.log(`${successCount} mensajes enviados con éxito`);
            console.log(`${failureCount} mensajes fallaron`);

            // Si hay tokens fallidos, eliminarlos de la base de datos
            if (failedTokens.length > 0) {
                await Usuario.updateMany({
                    fcmTokens: {
                        $in: failedTokens
                    }
                }, {
                    $pull: {
                        fcmTokens: {
                            $in: failedTokens
                        }
                    }
                });
                console.log('Tokens inválidos eliminados de la base de datos.');
            }
        }
    } catch (error) {
        console.error('Error al enviar notificaciones:', error);
    }
};

module.exports = sendNotification;