import { savePhotoService } from '../../services/photoService.js';
import insertPhotosModel from '../../models/spaces/insertPhotoModel.js';

const addPhotosController = async (req, res) => {
  try {
    console.log("Params recibidos:", req.params);
    console.log("Archivos recibidos:", req.files);

    const { spaceId } = req.params;
    if (!spaceId) {
      return res.status(400).send({ message: "Se requiere un spaceId" });
    }

    if (!req.files || (!req.files.photos && !req.files.photo)) {
      return res.status(400).send({ message: "No se han enviado imágenes" });
    }

    const photoFiles = req.files.photos || req.files.photo;
    const photos = Array.isArray(photoFiles) ? photoFiles : [photoFiles];

    const uploadPromises = photos.map(photo => savePhotoService(photo));
    const imageUrls = await Promise.all(uploadPromises);

    const photoIds = await insertPhotosModel(imageUrls, spaceId);

    return res.status(200).send({ 
      message: "Fotos agregadas con éxito", 
      imageUrls, 
      photoIds 
    });
  } catch (err) {
    console.error("Error al agregar las fotos:", err);
    return res.status(500).send({ message: "Error al agregar las fotos" });
  }
};

export default addPhotosController;