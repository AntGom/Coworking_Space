import express from 'express';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import routes from './src/routes/index.js';
import notFound from './src/middlewares/notFound.js';
import errorHandler from './src/middlewares/errorHandler.js';
import corsMiddleware from './src/middlewares/cors.js';
import './src/services/updateStatusService.js';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';

import mysql2 from 'mysql2/promise';
import { MYSQL_URL } from './env.js';

const testConnection = async () => {
    try {
        const pool = mysql2.createPool(MYSQL_URL);
        const [rows] = await pool.query('SELECT 1');
        console.log('Conexión exitosa:', rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

testConnection();
const app = express();

//Crear servidor HTTP.
const server = createServer(app);

//Configurar Socket.IO.
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('sendMessage', (message) => {
        console.log('Mensaje recibido del cliente:', message);
        io.emit('receiveMessage', message);
    });
});

//Servir archivos estáticos desde la carpeta 'uploads'.
const PUBLIC_FOLDER = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(PUBLIC_FOLDER));

//!-> REGISTRO DE MIDDLEWARES:
// Middleware CORS
app.use(corsMiddleware);

// Middleware Morgan-> info de la solicitud.
app.use(morgan('dev'));

// Middlewares Parseo del body de la petición.
app.use(express.json()); // Convierte solicitudes json->objeto y asigna a req.body.
app.use(express.urlencoded({ extended: true })); // Convierte solicitudes formularios.html->objeto y asigna a req.body.
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }));

//!-> Registro de directorio rutas.
app.post('/api/test-upload', (req, res) => {
    console.log('📂 Contenido de req.files en /test-upload:', req.files);
    res.json({ files: req.files });
});

app.use('/api', routes);

app.head('/', (req, res) => {
    res.status(200).end(); //Responde con 200-OK sin cuerpo
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Servidor funcionando correctamente 🚀' });
});


// Middleware para manejar rutas no encontradas (404)
app.use(notFound);

// Middleware manejo de errores
app.use(errorHandler);

// Ponemos el servidor a escuchar en un puerto obtenido de una variable de entorno
const PORT = process.env.PORT || 10000; // Usar el puerto asignado por Render o el predeterminado
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});