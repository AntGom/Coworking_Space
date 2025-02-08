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

const app = express();

//Crear servidor HTTP
const server = createServer(app);

//Configurar Socket.IO
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
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

//Servir archivos estáticos desde uploads
const PUBLIC_FOLDER = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(PUBLIC_FOLDER));

//!-> REGISTRO DE MIDDLEWARES:
// Middleware CORS
app.use(corsMiddleware);

// Middleware Morgan-> info de la solicitud.
app.use(morgan('dev'));

//Middlewares Parseo body de petición
app.use(express.json()); //Convierte json->objeto y asigna a req.body
app.use(express.urlencoded({ extended: true })); //Convierte formularios.html->objeto y asigna a req.body
app.use(fileUpload()); //Carga de archivos con express

//!-> Registro de directorio rutas.
app.use('/api', routes);

// Ruta base para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Ruta HEAD para solicitudes básicas de verificación
app.head('/', (req, res) => {
    res.status(200).end();
});

// Middleware para manejar rutas no encontradas (404)
app.use(notFound);

// Middleware manejo de errores
app.use(errorHandler);

// Ponemos el servidor a escuchar en un puerto obtenido de una variable de entorno
const PORT = process.env.PORT || 47197;  // Usar el puerto asignado por Render o el predeterminado
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
