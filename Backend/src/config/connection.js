import mysql2 from 'mysql2/promise';
import { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } from '../../env.js'; //Asegúrate de importar DB_PORT

// Crear la conexión a la base de datos usando el pool
const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
});

export default pool;
