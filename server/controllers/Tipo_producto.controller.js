import con from '../config/database.js';

const tiposProductos = async(req, res)=>{
    const sql = 'SELECT * FROM tipos_productos';   
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server tipos_productos:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
}

export default {
    tiposProductos
}