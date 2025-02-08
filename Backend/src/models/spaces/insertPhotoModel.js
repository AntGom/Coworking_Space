import pool from '../../config/connection.js';

const insertPhotosModel = async (photoUrls, spaceId) => {
  if (!spaceId) {
    throw new Error('No spaceId provided.');
  }

  // Verificar que el espacio existe en la base de datos
  const [spaceResult] = await pool.query(
    `SELECT id FROM espacios WHERE id = ?`,
    [spaceId]
  );

  if (spaceResult.length === 0) {
    throw new Error(`El espacio con ID ${spaceId} no existe.`);
  }

  // Insertar cada URL en la base de datos
  const photoIds = [];
  for (const photoUrl of photoUrls) {
    const [result] = await pool.query(
      `INSERT INTO espacios_fotos (name, espacio_id) VALUES(?, ?)`,
      [photoUrl, spaceId]
    );
    photoIds.push(result.insertId);
  }

  return photoIds;
};

export default insertPhotosModel;
