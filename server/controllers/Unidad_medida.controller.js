import con from '../config/database.js';

const unidadesMedida = async(req, res)=>{
    const sql = 'SELECT * FROM unidades_medida';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server unidadesMedida:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
} 

export default {
    unidadesMedida
}