import express from 'express';
const router = express.Router();//-> "Minirouter" que gestiona las rutas de los incidencias.
import * as incidentController from '../controllers/incidents/index.js';

router.get('/', incidentController.getIncidents); //-> .com/incidencias

export default router;