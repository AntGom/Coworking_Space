import pool from '../../config/connection.js';

const postNewVote = async (usuario_id, espacio_id, value, reserva_id) => {
    // Validar los datos de entrada
    if (!usuario_id || !espacio_id || value === undefined || !reserva_id) {
        throw new Error('Todos los campos son obligatorios.');
    }

    try {
        // Verificar si ya existe una votación para este usuario y reserva.
        const [existingVotes] = await pool.query(
            'SELECT id FROM espacios_votos WHERE usuario_id = ? AND reserva_id = ?',
            [usuario_id, reserva_id]
        );

        if (existingVotes.length > 0) {
            throw new Error('Ya has realizado una votación para esta reserva.');
        }

        // Insertar nueva votación si no se ha votado antes.
        const [result] = await pool.query(
            'INSERT INTO espacios_votos (usuario_id, espacio_id, value, reserva_id) VALUES (?, ?, ?, ?)',
            [usuario_id, espacio_id, value, reserva_id]
        );
        return result.insertId;
    } catch (error) {
        throw new Error('Error: ' + error.message);
    }
};

export default postNewVote;
