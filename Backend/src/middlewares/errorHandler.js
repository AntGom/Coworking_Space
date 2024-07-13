const errorHandler = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    res.status(status).json({ mensaje: message });
};

export default errorHandler;