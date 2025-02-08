import validateSchema from '../../utils/validateSchema.js';
import avatarSchema from '../../schema/user/avatarSchema.js';
import { avatarService } from '../../services/avatarService.js';
import updateAvatarModel from '../../models/users/updateAvatarModel.js';

const avatarController = async (req, res, next) => {
  console.log('🟢 Request recibida:', req.body);
  console.log('📂 Contenido de req.files:', req.files);
  
  try {
      if (!req.files || !req.files.avatar) {
          console.error('❌ No se ha subido ninguna imagen.');
          return res.status(400).json({ error: 'No se ha subido ninguna imagen.' });
      }

      const avatarFile = req.files.avatar;
      console.log('📂 Archivo recibido:', avatarFile.name);

      const avatarUrl = await avatarService(avatarFile);

      console.log('✅ Avatar URL obtenida:', avatarUrl);

      await updateAvatarModel(avatarUrl, req.user.id);

      res.json({
          status: 'ok',
          message: 'Avatar actualizado correctamente.',
          avatarUrl,
      });

  } catch (err) {
      console.error('❌ Error en avatarController:', err);
      next(err);
  }
};


export default avatarController;