import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los espacios.
import * as spaceController from '../controllers/spaces/index.js';


//*-> RUTAS PÚBLICAS.
router.get('/', spaceController.getSpaces); //-> .com/espacios

router.get('/:spaceId', spaceController.getSpaceById); //-> .com/espacios/:espacioId



export default router;