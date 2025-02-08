import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';  
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../../env.js';
import { saveFileError } from './errorService.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const savePhotoService = async (img) => {
  try {
    if (!img || !img.name) {
      throw new Error('La imagen no contiene un nombre válido.');
    }

    //Carpeta temporal segura para cualquier sistema
    const tmpDir = os.tmpdir();
    const tempPath = path.join(tmpDir, img.name);

    //Mover archivo temporalmente
    await img.mv(tempPath);

    //Subir a Cloudinary
    const result = await cloudinary.uploader.upload(tempPath, {
      resource_type: 'auto',
      width: 500,  
      crop: 'limit',
    });

    //Eliminar archivo temporal
    fs.unlinkSync(tempPath);

    //Devolver la URL de imagen
    return result.secure_url;
  } catch (err) {
    console.error('Error al subir la imagen a Cloudinary:', err);
    saveFileError();
    throw err;
  }
};



export const deletePhotoService = async (imgName) => {
  try {
    // Ruta al archivo que queremos eliminar.
    const imgPath = path.join(process.cwd(), UPLOADS_DIR, imgName);

    // Comprobamos si la imagen existe con la ayuda del método "access".
    try {
      await fs.access(imgPath);
    } catch {
      // Si el método anterior lanza un error quiere decir que la imagen no existe. Si es el caso, finalizamos la función.
      return;
    }

    // Eliminamos erl archivo de la carpeta de subida de archivos.
    // unlink->remover un archivo
    await fs.unlink(imgPath);
  } catch (err) {
    console.error(err);
    deleteFileError();
  }
};