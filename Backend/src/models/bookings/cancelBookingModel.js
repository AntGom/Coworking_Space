import pool from "../../config/connection.js";

const getBookingStartDate = async (reserva_id) => {
    const [rows] = await pool.query('SELECT fecha_inicio FROM reservas WHERE id = ?', [reserva_id]);
    if (rows.length === 0) {
        throw new Error('Reserva no encontrada');
    }
    return rows[0].fecha_inicio;
};

const cancelBookingModel = async (usuario_id, reserva_id) => {
    // Primero, obtenemos el rol del usuario para validar si es administrador
    const [user] = await pool.query('SELECT role FROM usuarios WHERE id = ?', [usuario_id]);
    const userRole = user[0]?.role;

    // Verificamos si el usuario es administrador
    const isAdmin = userRole === 'admin';

    // Consultamos la reserva
    const [reserva] = await pool.query('SELECT espacio_id FROM reservas WHERE id = ? AND (usuario_id = ? OR ? = ?)', [reserva_id, usuario_id, isAdmin, true]);

    if (reserva.length === 0) {
        throw new Error('Reserva no encontrada o no pertenece al usuario');
    }

    const espacio_id = reserva[0].espacio_id;

    // Actualizamos el estado de la reserva y del espacio
    await pool.query(
        'UPDATE reservas SET estado = ? WHERE id = ?',
        ['cancelada', reserva_id]
    );

    await pool.query(
        'UPDATE espacios SET estado = ? WHERE id = ?',
        ['libre', espacio_id]
    );
};


export { getBookingStartDate, cancelBookingModel };
