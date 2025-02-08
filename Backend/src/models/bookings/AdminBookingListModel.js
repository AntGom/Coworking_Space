import pool from "../../config/connection.js";

const getPendingBookings = async () => {
    const sql = `
        SELECT 
            r.id, 
            r.usuario_id, 
            r.espacio_id, 
            r.tipo, 
            DATE_FORMAT(r.fecha_inicio, '%d-%m-%Y') AS fecha_inicio, 
            DATE_FORMAT(r.fecha_fin, '%d-%m-%Y') AS fecha_fin, 
            r.estado, 
            r.observaciones, 
            u.username AS usuario_username, 
            e.nombre AS espacio_nombre,
            ef.name AS espacio_imagen
        FROM reservas r 
        JOIN usuarios u ON r.usuario_id = u.id 
        JOIN espacios e ON r.espacio_id = e.id
        LEFT JOIN (
            SELECT espacio_id, MIN(id) as min_id
            FROM espacios_fotos
            GROUP BY espacio_id
        ) ef_min ON ef_min.espacio_id = e.id
        LEFT JOIN espacios_fotos ef ON ef.id = ef_min.min_id
        WHERE r.estado = 'pendiente';
    `;

    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new Error('Error al obtener las reservas pendientes: ' + error.message);
    }
};

export default getPendingBookings;