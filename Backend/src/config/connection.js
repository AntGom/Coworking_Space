import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config(); // Asegúrate de cargar el archivo .env

const connectionUrl = process.env.MYSQL_URL; // Usa la URL directamente

const pool = mysql2.createPool(connectionUrl); // Pasa la URL completa

export default pool;
