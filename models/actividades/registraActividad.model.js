const Rodada = require('./rodada.model');
const Taller = require('./taller.model');
const Evento = require('./evento.model');

async function registrar(titulo, fechaHora, personasInscritas, ubicacion, descripcion, estado, duracion, imagen) {
    try {
        const nuevaActividad = new Actividad({
            titulo: titulo,
            fechaHora: fechaHora,
            personasInscritas: personasInscritas,
            ubicacion: ubicacion,
            descripcion: descripcion,
            estado: estado,
            duracion: duracion,
            imagen: imagen
        });
        await nuevaActividad.save();

    } catch (error) {
        console.error('Error al registrar la actividad:', error);
    }
}