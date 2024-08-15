import * as bookingModel from '../../models/bookings/index.js';
import { addHours, isBefore } from 'date-fns';
import cancelBookingSchema from '../../schema/bookings/cancelBookingSchema.js';

const cancelBookingController = async (req, res, next) => {
    const { reserva_id } = req.body;
    const usuario_id = req.user.id; // El ID del usuario que está cancelando
    const userRole = req.user.role; // El rol del usuario, si es necesario para otros casos

    // Validar los datos de entrada
    const { error } = cancelBookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Obtener la fecha de inicio de la reserva
        const fechaInicio = await bookingModel.getBookingStartDate(reserva_id);

        // Validar que la cancelación se hace con al menos 24 horas de antelación
        const currentDate = new Date();
        const startDate = new Date(fechaInicio);

        if (isBefore(startDate, addHours(currentDate, 24))) {
            return res.status(400).json({ message: 'Lo sentimos! No está permitido cancelar una reserva con menos de 24 horas de antelación.' });
        }

        // Cancelar la reserva
        await bookingModel.cancelBookingModel(usuario_id, reserva_id);

        res.send({
            status: 'ok',
            message: 'Reserva cancelada con éxito!'
        });
    } catch (error) {
        next(error);
    }
};

export default cancelBookingController;
