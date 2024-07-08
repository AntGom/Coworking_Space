const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            message: 'Acceso denegado: solo administradores',
        });
    }
};

export default isAdmin;
