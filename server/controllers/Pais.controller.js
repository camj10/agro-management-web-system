import con from '../config/database.js';

const insertarPais = async(req, res)=>{
    const sql = "INSERT INTO paises (`descripcion`) VALUES (?)";
    const values = [req.body.descripcion, ]
    con.query(sql,[values], (err, result) => {
        if(err) return res.json({Error:"Inserting data Error in Server"});
        return res.json({Status:"Success"});
    })
}

const listarPaises = async(req, res)=>{
    const sql = 'SELECT * FROM paises';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server paises:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server paises");
            return res.json({ Status: "Success", data });
        }
    })
}


export default {
    insertarPais,
    listarPaises
}