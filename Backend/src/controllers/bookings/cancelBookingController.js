import * as bookingModel from '../../models/bookings/index.js';
import { addHours, isBefore } from 'date-fns';
import cancelBookingSchema from '../../schema/bookings/cancelBookingSchema.js';
import sendMailUtil from '../../utils/sendMailUtils.js';

const cancelBookingController = async (req, res, next) => {
    const { reserva_id } = req.body;
    const usuario_id = req.user.id;

    //Validar datos de entrada
    const { error } = cancelBookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        //Fecha de inicio de la reserva
        const fechaInicio = await bookingModel.getBookingStartDate(reserva_id);

        //Validar cancelación al menos 24 horas de antelación
        const currentDate = new Date();
        const startDate = new Date(fechaInicio);

        if (isBefore(startDate, addHours(currentDate, 24))) {
            return res.status(400).json({ message: 'Lo sentimos! No está permitido cancelar una reserva con menos de 24 horas de antelación.' });
        }

        //Información del usuario para email
        const res1 = await bookingModel.getUsername(reserva_id);
        const res2 = await bookingModel.getUserEmail(reserva_id);

        
        const username = res1[0]?.username || "Usuario";
        const email = res2[0]?.email;

        if (!email) {
            return res.status(400).json({ message: "No se encontró un email para la reserva." });
        }

        //Cancelar reserva
        await bookingModel.cancelBookingModel(usuario_id, reserva_id);

        //Enviar email
        const emailSubject = 'Cancelación de Reserva';
        const emailBody = `
            Hola ${username}, 
            
            Lamentamos informarte que tu reserva ha sido cancelada. 
            
            Si tienes alguna duda, contáctanos.

            Atentamente, 
            El equipo de Coworking Spaces.
        `;

        await sendMailUtil(email, emailSubject, emailBody);

        res.send({
            status: 'ok',
            message: 'Reserva cancelada con éxito. Se ha enviado un correo de notificación.'
        });

    } catch (error) {
        next(error);
    }
};

export default cancelBookingController;