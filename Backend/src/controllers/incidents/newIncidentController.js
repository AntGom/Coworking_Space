import * as incidentModel from '../../models/incidents/index.js'; 
import newIncidentSchema from '../../schema/incidents/newIncidentSchema.js';

const createIncident = async (req, res, next) => {
    try {
        const { error } = newIncidentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ mensaje: error.details[0].message });
        }

        const { reserva_id, usuario_id, categoria_incidencia_id, titulo } = req.body;

        const incidentId = await incidentModel.newIncident(reserva_id, usuario_id, categoria_incidencia_id, titulo);

        res.status(201).send({
            status: 'ok',
            id: incidentId,
            mensaje: '¡Incidencia creada!'
        });

    } catch (err) {
        next(err);
    }
};

export default createIncident;
