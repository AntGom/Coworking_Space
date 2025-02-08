import pool from "../../config/connection.js";

const updateAvatarModel = async (avatarUrl, userId) => {
    try {
        const [result] = await pool.query(
            `UPDATE usuarios SET avatar = ? WHERE id = ?`,
            [avatarUrl, userId]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error('Error al actualizar avatar:', error);
        throw error;
    }
};

export default updateAvatarModel;