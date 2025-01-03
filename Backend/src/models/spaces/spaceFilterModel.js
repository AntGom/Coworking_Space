import pool from "../../config/connection.js";

const spacesList = async () => {
    let sql = `
    SELECT e.id, e.nombre, e.descripcion, e.valoracion_media, ce.nombre AS categorias_nombre,
           ef.name AS imagen
    FROM espacios e
    JOIN categorias_espacios ce ON e.categoria_id = ce.id
    LEFT JOIN (
        SELECT ef1.espacio_id, ef1.name
        FROM espacios_fotos ef1
        INNER JOIN (
            SELECT espacio_id, MIN(id) AS min_id
            FROM espacios_fotos
            GROUP BY espacio_id
        ) ef2 ON ef1.espacio_id = ef2.espacio_id AND ef1.id = ef2.min_id
    ) ef ON e.id = ef.espacio_id
    WHERE 1
    ORDER BY e.id ASC
    `;

    try {
        const [rows] = await pool.query(sql);
        return rows;
    } catch (error) {
        throw new Error('Error al ejecutar la consulta en Espacio.filtrar: ' + error.message);
    }
};

export default spacesList;
