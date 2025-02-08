import mysql2 from 'mysql2/promise';
import { MYSQL_URL } from '../../env.js';
import { URL } from 'url';

//Analizar URL de conexión
const dbUrl = new URL(MYSQL_URL);

const pool = mysql2.createPool({
    host: dbUrl.hostname,
    port: dbUrl.port,
    user: dbUrl.username,
    password: dbUrl.password,
    database: dbUrl.pathname.split('/')[1],
});

export default pool;
