import con from '../config/database.js';

const addZafra = async(req, res)=>{
    const sql = "INSERT INTO zafras (`descripcion`,`estado`) VALUES (?,1)";
        const values = [
            req.body.descripcion, 
        ]
        con.query(sql,[values], (err, result) => {
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
    })
}

const listarZafra = async(req, res)=>{
    const sql = 'SELECT * FROM zafras WHERE estado="1"'
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server Tipo_Trabajo:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
} 

const borrarZafra = async(req, res)=>{
    const zafraId = req.params.id;
    console.log("zafraId: ",zafraId)
    con.query('UPDATE zafras SET estado = ? WHERE id_zafra = ?', [0,zafraId], (err, result) => {
        if (err) {
            console.error('Error al eliminar la zafra:', err);
            return res.json({ Status: 'Error in Server' });
        }else {
            console.log("Success server zafra");
            return res.json({ Status: 'Success', message: 'zafra eliminada exitosamente' });
        }
    })
}

const editZafra = async(req, res)=>{
    console.log("req.body.id_zafra: ",req.body.id_zafra)
    const zafraId = req.body.id_zafra;
    const updatedData = req.body; // Los nuevos datos para la zafra entregada
    // Realiza una consulta SQL para actualizar la zafra en la base de datos
    // Utiliza zafraId para identificar la zafra a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE zafras SET descripcion = ? WHERE id_zafra = ?`, [updatedData.descripcion, zafraId], (err, result) => {
        if (err) { 
            console.error('Error al actualizar la zafra', err);
            return res.json({ Status: 'Error in Server' });
        }else{
            if(result){
                return res.json({ Status: 'Success', message: 'zafra actualizada exitosamente' }), console.log("Success actualizar");
            }
        }
    })
} 

const editZafraInfo = async(req, res)=>{
    const zafraId = req.params.id
    try {
        con.query( `SELECT * FROM zafras WHERE estado="1" AND id_zafra = ?`, [zafraId], (err, data) => {
            if (err) {
                console.error("Error en la consulta SQL:", err);
                return res.status(500).json({ Error: "Error en la consulta SQL" });
            }
            return res.status(200).json({ Status: "Success", data });
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(400).json({ Status: "Error" });
    }
}

export default {
    addZafra,
    listarZafra,
    borrarZafra,
    editZafra,
    editZafraInfo
}