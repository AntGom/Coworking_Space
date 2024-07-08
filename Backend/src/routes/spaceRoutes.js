import express from 'express';
const router = express.Router(); //-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';
import authenticateMiddleware from '../middlewares/authenticateMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';

//*-> RUTAS PÚBLICAS.
router.get('/', spaceController.getSpaces); //-> .com/espacios

router.get('/:spaceId', spaceController.getSpaceById); //-> .com/espacios/:espacioId

router.post('/', authenticateMiddleware, isAdmin, spaceController.createSpace); //-> .com/crear-espacio

export default router;
