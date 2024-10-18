const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT

const SECRET_KEY = process.env.JWT_SECRET || "w@M9EZRjekuw)tzt1vGb2J0:HAsfm^*N5X+'f3[KOi.S6@:mmU";

const verificarToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    console.log("El tocken es el sigueinte:", SECRET_KEY)


    if (!token) {
        return res.status(403).json({ message: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
        req.user = decoded; // Guardar la información del token en req.user
        next(); // Continuar con la siguiente función
    } catch (err) {
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};

module.exports = {
    verificarToken
}
