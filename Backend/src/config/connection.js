import mysql2 from 'mysql2/promise';
import { MYSQL_URL } from '../../env.js'; 

// Conectar con BBDD usando URL completa
const pool = mysql2.createPool(MYSQL_URL); 

export default pool;
