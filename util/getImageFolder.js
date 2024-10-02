const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

async function getImageFolder(request, folderName) {
  const Json = request[folderName];

  if (!Json || !Array.isArray(Json)) {
    throw new Error("Invalid request data");
  }

  try {
    const updatedJson = await Promise.all(
      Json.map(async (folder) => {
        if (folder.imagen) {
          const imageParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${folderName}${folder.imagen}`,
            Expires: 60 * 60, // URL expiration time in seconds (e.g., 1 hour)
          };
          folder.imagen = s3.getSignedUrl("getObject", imageParams);
        } else {
          folder.imagen = null;
        }
        return folder;
      })
    );

    return updatedJson;
  } catch (error) {
    console.error("Error fetching image from S3:", error);
    throw new Error("Error fetching image from S3");
  }
}

module.exports = getImageFolder;
