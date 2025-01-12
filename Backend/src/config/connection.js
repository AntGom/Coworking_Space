import mysql2 from 'mysql2/promise';
import { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } from '../../env.js';

// conectar express<->mysql. Usamos createpool y pasamos objeto de configuracion.
const pool = mysql2.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
});

export default pool;