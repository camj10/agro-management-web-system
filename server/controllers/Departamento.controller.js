import con from '../config/database.js';

const insertarDepartamento = async(req, res)=>{
    const sql = "INSERT INTO departamentos (`descripcion`) VALUES (?)";
        const values = [
            req.body.descripcion, 
        ]
        con.query(sql,[values], (err, result) => {
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
        })
}

const listarDepartamentos = async(req, res)=>{
    const sql = 'SELECT * FROM departamentos';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server departamentos:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server departamentos");
            return res.json({ Status: "Success", data });
        }
    });
}

export default {
    insertarDepartamento, 
    listarDepartamentos
}