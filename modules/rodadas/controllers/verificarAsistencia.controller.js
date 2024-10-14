const Rodada = require('../../../models/actividades/rodada.model');
const Ruta = require('../../../models/ruta/ruta.model');
const {
    Usuario
} = require('../../../models/perfil/usuario.model');

function convertirTiempoADecimal(tiempo) {
    // Separar el texto en partes
    const partes = tiempo.split(' ');
    
    const horas = parseInt(partes[0]); 
    const minutos = parseInt(partes[2]); 

    // Convertir minutos a horas (1 hora = 60 minutos)
    const horasDesdeMinutos = minutos / 60;

    // Sumar horas
    const totalHoras = horas + horasDesdeMinutos;

    return totalHoras;
}

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

        // Verificar si el usuario ya ha verificado asistencia a esta rodada
        if (rodada.usuariosVerificados.includes(firebaseUID)) {
            return response.status(400).json({ 
                message: 'Asistencia ya verificada para esta rodada' 
            });
        }

        if (codigo == codigoAsistencia) {
            usuario.rodadasCompletadas += 1; 
            usuario.kilometrosRecorridos += distanciaNum; 
            usuario.tiempoEnRecorrido += tiempoNum; 

            // Agregar el UID del usuario al array de usuarios verificados
            rodada.usuariosVerificados.push(firebaseUID);

            let nuevaMedallaGanada = false;

            nuevaMedallaGanada = actualizarMedallas(usuario);

            await usuario.save(); 
            await rodada.save(); // Guardar los cambios en la rodada

            response.status(200).json({ 
                status: 200,
                message: 'Asistencia verificada',
                nuevaMedallaGanada: nuevaMedallaGanada
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


function actualizarMedallas(usuario) {

    const medallasCondiciones = [
        { id: 1, criterio: usuario.rodadasCompletadas >= 5 }, // Asiste a 5 rodadas
        { id: 2, criterio: usuario.rodadasCompletadas >= 20 }, // Asiste a 20 rodadas
        { id: 3, criterio: usuario.rodadasCompletadas >= 50 }, // Asiste a 50 rodadas
        { id: 4, criterio: usuario.kilometrosRecorridos >= 10 }, // Recorre 10 km
        { id: 5, criterio: usuario.kilometrosRecorridos >= 50 }, // Recorre 50 km
        { id: 6, criterio: usuario.kilometrosRecorridos >= 100 }, // Recorre 100 km
        { id: 7, criterio: usuario.tiempoEnRecorrido >= 10 }, // Nivel principiante 10 horas
        { id: 8, criterio: usuario.tiempoEnRecorrido >= 30 }, // Nivel intermedio 30 horas
        { id: 9, criterio: usuario.tiempoEnRecorrido >= 60 }, // Nivel experto 60 horas
    ];

    let nuevaMedallaGanada = false;

    medallasCondiciones.forEach(condicion => {
        // Solo cambia el estado si es una nueva medalla
        if (condicion.criterio && !usuario.estadoMedallas[condicion.id - 1]) {
            usuario.estadoMedallas[condicion.id - 1] = true; 
            usuario.estadoMedallas[condicion.id + 8] = false; 
            nuevaMedallaGanada = true; 
        }
    });

    return nuevaMedallaGanada;
}
