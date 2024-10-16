const Foro = require('../../../models/foro/foro.model');
const {Usuario} = require("../../../models/perfil/usuario.model");
const getUserImage = require("../../../util/getUserImage");

exports.obtenerForoPorIdDeActividad = async (req, res) => {
    try {
        // Obtener el ID de la actividad desde los parámetros de la solicitud
        const actividadId = req.params.id;

        // Buscar el foro que corresponde a la actividad y poblar los comentarios
        const foro = await Foro.findOne({ actividad: actividadId }).populate('comentarios').exec();


        const firebaseUID = req.userUID.uid;
        let perfil = await Usuario.findOne({ firebaseUID });
        if (!perfil) {
          return res.status(404).json({
            message: "Perfil no encontrado",
            data: null
          });
        }

        // Añadir la imagen de perfil a cada comentario
        for (let comentario of foro.comentarios) {

            let userPerfil = await Usuario.findOne({ username: comentario.username });
            if (userPerfil) {
                const userImageProfile = userPerfil.imagen
                ? await getUserImage(userPerfil._id.toHexString(), userPerfil.imagen)
                : null;
                comentario.fotoPerfil = userImageProfile;
            }
        }

        // Enviar el foro encontrado como respuesta
        res.status(200).json(foro);
    } catch (error) {
        // Manejar el error
        res.status(500).json({ mensaje: 'Error al obtener el foro', error: error.message });
    }
};