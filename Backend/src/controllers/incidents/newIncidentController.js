import * as incidentModel from '../../models/incidents/index.js'; 
import newIncidentSchema from '../../schema/incidents/newIncidentSchema.js';

const createIncident = async (req, res, next) => {
    try {
        const { error } = newIncidentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ mensaje: error.details[0].message });
        }

        const { reserva_id, usuario_id, categoria_incidencia_id, titulo } = req.body;

       /*  // Obtiene la fecha de inicio de la reserva.
        const fechaInicio = await incidentModel.getReservationStartDate(reserva_id);
        if (!fechaInicio) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada.' });
        }

        // Valida que la incidencia no se pueda crear antes de la fecha de inicio de la reserva.
        const fechaActual = new Date();
        if (new Date(fechaInicio) > fechaActual) {
            return res.status(400).json({ mensaje: 'No puedes crear una incidencia antes de la fecha de inicio de la reserva.' });
        } */

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
