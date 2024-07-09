import con from '../config/database.js';

const calidades_granos = async(req, res)=>{
    const sql = 'SELECT * FROM calidades_granos';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server calidades_granos:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server calidades_granos");
            return res.json({ Status: "Success", data });
        }
    })
}

const addCalidadGrano = async(req, res)=>{
    const sql = "INSERT INTO calidades_granos (`descripcion`) VALUES (?)";
        const values = [ 
            req.body.descripcion, 
        ]
        con.query(sql,[values], (err, result) => {
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
        })
}

const listarCalidadesGranos = async(req, res)=>{
    const sql = 'SELECT * FROM calidades_granos';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server listarCalidadesGranos:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
}

export default {
    calidades_granos, 
    addCalidadGrano, 
    listarCalidadesGranos
}