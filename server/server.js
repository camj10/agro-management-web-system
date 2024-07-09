import express from 'express';
import router from './routes/index.js';
import con from './config/database.js';
import cors from 'cors';
import mysql from 'mysql';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {verifyUser} from './middleware/verifyUser.js';
// import { verifyRole } from './middleware/verifyRole.js';

const PORT = process.env.SERVER_PORT || 8081;
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.use('/', router);

app.listen(8081, ()=>{
    console.log("Running");
})



const saltRounds = 10;

// Resto del código relacionado con la autenticación y otras funcionalidades

// Manejador de errores

const salt = 10;


app.get('/', verifyUser, (req,res)=>{
    return res.json({Status:"Success",username: req.username, role: req.role}) ;
})
// app.get('/hola', verifyRole('admin'), (req, res) => {
//     return res.json({ Status: "Success", username: req.username, role: req.role });
// });


app.post('/register', (req, res)=>{
const sql = "INSERT INTO login (`username`,`email`,`password`) VALUES (?)";
bcrypt.hash(req.body.password.toString(),salt, (err,hash) => { 
    if(err) return res.json({Error:"Error hashing password"});
    const values = [
        req.body.username, 
        req.body.email, 
        hash
    ]
    con.query(sql,[values], (err, result) => {
        if(err) return res.json({Error:"Inserting data Error in Server"});
        return res.json({Status:"Success"});
    })
})
}) 

app.post('/login', (req, res)=>{
    const sql = 'SELECT * FROM login WHERE email = ?';
    con.query(sql,[req.body.email], (err, data) => {
        if(err) return res.json({Status:"Error in Server"}), console.log("Error in Server line 89"); 
        if(data.length > 0){
                console.log("data success line 91")
                bcrypt.compare(req.body.password.toString(), data[0].password, (err,response) => { 
                    if(err) return res.json({Error:"Password compare error"}), console.log("Compare error Server line 93");
                    if(response){
                        //Crear el token con el username y la secret key
                        const username = data[0].username;
                        const role = data[0].role
                        const token = jwt.sign({username, role}, "jwt-secret-key", {expiresIn: '1d'})

                        //Almacena el token en la cookie del navegador 
                        res.cookie('token',token);

                        //Retorna respuesta positiva a la petición de login
                        return res.json({Status:"Success", token: token}), console.log("token success line 98")
                    }else {
                        return res.json({Error:"Password not matched"}), console.log("Password not matched Server line 100")
                    }
                })
            } else {
                return res.json({Error:"No email existed"})
            }
    })
})
    
app.get('/logout', (req, res) => { //Para cerrar la sesión borramos el token
    res.clearCookie('token')
    return res.json({Status: "Success"})
})

//Agregar en el DER lo referente al mapa  