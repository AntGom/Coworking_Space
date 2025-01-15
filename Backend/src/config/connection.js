import mysql2 from 'mysql2/promise';
import { MYSQL_URL } from '../../env.js';  // Importa la URL completa

// Usamos el constructor de URL de Node.js para analizar la URL de la base de datos
const dbUrl = new URL(MYSQL_URL);

const pool = mysql2.createPool({
    host: dbUrl.hostname,       // El host (mysql.railway.internal o proxy.rlwy.net)
    port: dbUrl.port,           // El puerto (47197 o 3306)
    user: dbUrl.username,       // El usuario (root)
    password: dbUrl.password,   // La contraseña
    database: dbUrl.pathname.slice(1),  // El nombre de la base de datos (railway)
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
});

export default pool;
