const Rodada = require('../../../models/actividades/rodada.model');
const Ruta = require('../../../models/ruta/ruta.model');
const {
    Usuario
} = require('../../../models/perfil/usuario.model');

function convertirTiempoADecimal(tiempo) {
    // Separar el texto en partes
    const partes = tiempo.split(' ');
    
    // Obtener horas y minutos
    const horas = parseInt(partes[0]); // Primer elemento es el número de horas
    const minutos = parseInt(partes[2]); // Tercer elemento es el número de minutos

    // Convertir minutos a horas (1 hora = 60 minutos)
    const horasDesdeMinutos = minutos / 60;

    // Sumar horas
    const totalHoras = horas + horasDesdeMinutos;

    return totalHoras;
}

// Controlador para actualizar la ubicación de una rodada
exports.verificarAsistencia = async (request, response) => {
    try {
        const IDRodada = request.body.IDRodada;
        const codigo = request.body.codigo;
        const firebaseUID = request.userUID.uid;

        const rodada = await Rodada.findById(IDRodada);
        const codigoAsistencia = rodada.codigoAsistencia;
        const rutaID = rodada.ruta;

        const ruta = await Ruta.findById(rutaID);
        const distancia = ruta.distancia;
        const distanciaNum = parseFloat(distancia);
        const tiempo = ruta.tiempo;
        const tiempoNum = convertirTiempoADecimal(tiempo);
        
        if (!codigoAsistencia) { 
            return response.status(400).json({ 
                status: 400,
                message: 'La rodada no tiene un código de asistencia' 
            });
        }

        if (!codigo) { 
            return response.status(400).json({ 
                status: 400,
                message: 'Código de asistencia requerido' 
            });
        }

        const usuario = await Usuario.findOne({ firebaseUID });
        if (!usuario) {
            return response.status(404).json({ 
                status: 404,
                message: 'Usuario no encontrado' 
            });
        }

        if (codigo == codigoAsistencia) {
            usuario.rodadasCompletadas += 1; 
            usuario.kilometrosRecorridos += distanciaNum; 
            usuario.tiempoEnRecorrido += tiempoNum; 

            await usuario.save(); 

            response.status(200).json({ 
                status: 200,
                message: 'Asistencia verificada'
            });
        } else {
            response.status(400).json({ 
                status: 400,
                message: 'Código de asistencia incorrecto' 
            });
        }
    } catch (error) {
        response.status(500).json({ 
            status: 500,
            message: 'Error al verificar asistencia', 
            error: error.message 
        });
    }
};
