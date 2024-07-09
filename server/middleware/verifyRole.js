// // Importa los módulos necesarios para trabajar con JWT
// import jwt from 'jsonwebtoken';

// // Middleware para verificar el rol del usuario
// export const verifyRole = (req, res, requiredRoles) => {
//     // Obtén el token del encabezado de la solicitud
//     console.log("requiredRoles:",requiredRoles)
//     const token = req.cookies.token;
//     console.log("token :",token)
//     // Verifica si el token existe
//     if (!token) {
//         return res.status(401).json({ Status: "Error", message: "No token provided" });
//     }

//     // Verifica el token
//     jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ Status: "Error", message: "Failed to authenticate token" });
//         }

//         // Extrae la información del token
//         req.username = decoded.username;
//         req.role = decoded.role;

//         // Verifica el rol del usuario
//         if (!requiredRoles.includes(req.role)) {
//             return res.status(403).json({ Status: "Error", message: "Insufficient permissions" });
//         }
//         // Si pasa todas las verificaciones, permite el acceso a la ruta
//         next();
//     });
// };
