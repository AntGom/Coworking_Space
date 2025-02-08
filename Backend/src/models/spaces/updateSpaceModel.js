import pool from '../../config/connection.js';

const updateSpaceModel = async ({
    id, //id del espacio para actualizarlo
    nombre,
    descripcion,
    categoria_id,
    capacidad,
    precio_por_persona,
    precio_espacio_completo,
    direccion,
    estado 
   
}) => {
    const query = `
        UPDATE espacios
        SET nombre = ?, descripcion = ?, categoria_id = ?, capacidad = ?, precio_por_persona = ?, precio_espacio_completo = ?, direccion = ?, estado = ? 
        WHERE id = ?
    `;

    const [result] = await pool.query(query, [
        nombre,
        descripcion,
        categoria_id,
        capacidad,
        precio_por_persona,
        precio_espacio_completo,
        direccion,
        estado,
        id,
    ]);

    return result.affectedRows;
};

export default updateSpaceModel;
