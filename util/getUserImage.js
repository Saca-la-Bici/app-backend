const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

async function getUserImage(userId, imageName) {
  if (!imageName) {
    return null; // O lanzar un error si prefieres
  }

  try {
    const imageParams = {
      Bucket: process.env.AWS_BUCKET,
      Key: `profile/${imageName}`, // Asumiendo que las imágenes de usuario están en la carpeta 'profile/'
      Expires: 60 * 60, // Tiempo de expiración de la URL en segundos (por ejemplo, 1 hora)
    };

    const imageUrl = s3.getSignedUrl("getObject", imageParams);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching user image from S3:", error);
    throw new Error("Error fetching user image from S3");
  }
}

module.exports = getUserImage;
