const Comentario = require('../../../models/foro/comentario.model');

exports.publicarComentario = async (request, response) => {
    const username = request.body.username;
    const fotoPerfil = request.body.fotoPerfil;
    const contenido = request.body.contenido;

    try {
        if (!contenido || contenido.length < 4 || contenido.length > 500) {
            return response.status(400).json({
                code: 400,
                msg: 'El contenido del comentario es inválido',
                data: null
            });
        }

        const nuevoComentario = await Comentario.publicarComentario(username, fotoPerfil, contenido);
      
        return response.status(200).json({
            code: 200,
            msg: 'Comentario publicado exitosamente',
            data: nuevoComentario
        });
    } catch (error) {
        return response.status(500).json({
            code: 500,
            msg: 'Error al publicar el comentario',
            error: error,
            data: null
        });
    }
};