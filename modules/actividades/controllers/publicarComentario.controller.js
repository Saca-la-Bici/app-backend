const Comentario = require('../../../models/foro/comentario.model');

exports.publicarComentario = async (req, res) => {
    try {
        const {username, fotoPerfil, contenido} = req.body;

        if (!contenido || contenido.length < 4 || contenido.length > 500) {
            return res.status(400).json({
                code: 400,
                msg: 'El contenido del comentario es inválido',
                data: null
            });
        }

        const nuevoComentario = new Comentario({
            username, 
            //fotoPerfil,
            contenido
        });
        await nuevoComentario.save();
        return res.status(200).json({
            code: 200,
            msg: 'Comentario publicado exitosamente',
            data: nuevoComentario
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            msg: 'Error al publicar el comentario',
            error: error,
            data: null
        });
    }
};