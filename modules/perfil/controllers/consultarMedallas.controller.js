const Medalla = require("../../../models/medallas/medalla.model");
const { Usuario } = require("../../../models/perfil/usuario.model");
const getImageFolder = require("../../../util/getImageFolder");

exports.consultarMedallas = async (req, res) => {
  const firebaseUID = req.userUID.uid;
  try {
    // Busca el perfil del usuario por su firebaseUID
    const perfil = await Usuario.findOne({ firebaseUID });

    // Si no se encuentra el perfil, se lanza un error
    if (!perfil) {
      return res.status(404).json({
        code: 404,
        msg: "Usuario no encontrado",
        data: null,
      });
    }

    // Extrae el objeto estadoMedallas
    const estadoMedallas = perfil.estadoMedallas;

    // Listas para medallas activas (true)
    const MedallasActivasIds = [];

    // Itera sobre el array estadoMedallas
    estadoMedallas.forEach((estado, index) => {
      if (estado) {
        MedallasActivasIds.push(index + 1); // Posición + 1 corresponde al idMedalla
      }
    });

    // Busca en la base de datos las medallas activas
    const MedallasActivas = await Medalla.find({
      idMedalla: { $in: MedallasActivasIds },
    });

    // Recupera las imágenes de S3
    const folder = "medals/";
    req.medals = MedallasActivas; // Cambiar el nombre de la propiedad a `medals`
    MedallasActivas.imagen = await getImageFolder(req, folder); // Usar `req` directamente

    // Envía la respuesta con los detalles completos de las medallas activas
    return res.status(200).json({
      medallasActivas: MedallasActivas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      msg: "Error al intentar consultar las medallas",
      data: null,
    });
  }
};
