import con from '../config/database.js'

const insertarAuditoria = async(req, res)=>{
    console.log("Ingresa a auditoria")
    const usuario = 'hola'
    const date = Date.now()
    const fecha = new Date(date)

    const sql = "INSERT INTO auditoria (`usuario`,`operacion`,`fecha`) VALUES (?)";
    const values = [
        usuario, 
        req.body, 
        fecha, 
    ]
    con.query(sql,[values], (err, result) => {
        if(err){
            console.log("err: ",err)
            return res.json({Error:"Inserting data Error in Server"});
        } 
        return res.json({Status:"Success"});
    })
}

const listarAuditoria = async(req, res)=>{
    const sql = 'SELECT * FROM auditoria';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server auditoria:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server auditoria");
            return res.json({ Status: "Success", data });
        }
    }) 
} 
 
export default {
    insertarAuditoria, 
    listarAuditoria
}