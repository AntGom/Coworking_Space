import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';  
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '../../env.js';

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const avatarService = async (img) => {
  try {
    if (!img || !img.name || !img.mv) {
      throw new Error('La imagen no contiene un nombre válido.');
    }

    const tmpDir = os.tmpdir();
    const tempPath = path.join(tmpDir, img.name);
    await img.mv(tempPath);

    console.log("📤 Subiendo archivo a Cloudinary desde:", tempPath);

    const result = await cloudinary.v2.uploader.upload(tempPath, {
      resource_type: 'auto',
      width: 500,
      crop: 'limit',
      folder: 'users',
    });

    console.log("✅ Imagen subida a Cloudinary:", result.secure_url);

    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }

    return result.secure_url;
  } catch (err) {
    console.error('❌ Error al subir la imagen a Cloudinary:', err);
    throw err;
  }
};