import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const verifyUser = (req, res, next) => { 
    const token = req.cookies.token;
    if (!token) {
        console.log("No estás autenticado")
        return res.status(401).json({ Error: "You are not authenticated" }); // Cambia el código de estado a 401 (No autorizado)
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                console.log("Error en el token")
                return res.status(401).json({ Error: "Token isn't ok" }); // Cambia el código de estado a 401
            } else {
                req.username = decoded.username;
                req.role = decoded.role;
                next();
            }
        });
    }
} 