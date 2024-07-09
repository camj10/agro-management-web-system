import con from '../config/database.js';

const editTipoTrabajo = async(req, res)=>{
    console.log("req contiene: ",req.body.id_tipo_trabajo)
    const tipo_trabajoId = req.body.id_tipo_trabajo;
    const updatedData = req.body; // Los nuevos datos para la tipo_trabajo entregada
    // Realiza una consulta SQL para actualizar la tipo_trabajo en la base de datos
    // Utiliza tipo_trabajoId para identificar la tipo_trabajo a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE tipos_trabajos SET descripcion = ?`, [updatedData.descripcion], (err, result) => {
        console.log("updatedData in server ",updatedData, tipo_trabajoId)
        if (err) {
            console.error('Error al actualizar el tipo_trabajo', err);
            return res.json({ Status: 'Error in Server' });
        }else{
            console.log(result)
            return res.json({ Status: 'Success', message: 'tipo_trabajo actualizada exitosamente' }), console.log("Success actualizar");
        }
    }) 
} 

const addTipoTrabajo = async(req, res)=>{
    const sql = "INSERT INTO tipos_trabajos (`descripcion`,`estado`) VALUES (?,1)";
    const values = [req.body.descripcion ]
    con.query(sql,[values], (err, result) => {
        if(err) return res.json({Error:"Inserting data Error in Server"});
        return res.json({Status:"Success"});
    })
}

const listarTipo_Trabajo = async(req, res)=>{
    const sql = 'SELECT * FROM tipos_trabajos WHERE estado="1"'
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server Tipo_Trabajo:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
}

const borrarTipo_Trabajo = async(req, res)=>{
    const Tipo_TrabajoId = req.params.id;
    console.log("Tipo_TrabajoId: ",Tipo_TrabajoId)
    con.query('UPDATE tipos_trabajos SET estado = ? WHERE id_tipo_trabajo = ?', [0,Tipo_TrabajoId], (err, result) => {
        if (err) {
            console.error('Error al eliminar la Tipo_Trabajo:', err);
            return res.json({ Status: 'Error in Server' });
        }else {
            return res.json({ Status: 'Success', message: 'Tipo_Trabajo eliminada exitosamente' });
        }
        })
}

const editTipo_Trabajo = async(req, res)=>{
    console.log("req.body.id_tipo_trabajo: ",req.body.id_tipo_trabajo)
    const Tipo_TrabajoId = req.body.id_tipo_trabajo;
    const updatedData = req.body; // Los nuevos datos para la Tipo_Trabajo entregada
    // Realiza una consulta SQL para actualizar la Tipo_Trabajo en la base de datos
    // Utiliza Tipo_TrabajoId para identificar la Tipo_Trabajo a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE tipos_trabajos SET descripcion = ? WHERE id_tipo_trabajo = ?`, [updatedData.descripcion, Tipo_TrabajoId], (err, result) => {
        if (err) { 
            console.error('Error al actualizar la Tipo_Trabajo', err);
            return res.json({ Status: 'Error in Server' });
        }else{
            if(result){
                return res.json({ Status: 'Success', message: 'Tipo_Trabajo actualizada exitosamente' }), console.log("Success actualizar");
            }
        }
    })
}

const infoTipo_Trabajo = async(req, res)=>{
    const Tipo_TrabajoId = req.params.id
    con.query( `SELECT * FROM tipos_trabajos WHERE estado="1" AND id_tipo_trabajo = ?`, [Tipo_TrabajoId],(err, data) => {
        if (err) {
            console.log("Error in server Tipo_Trabajo:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    })
}



export default {
    editTipoTrabajo,
    addTipoTrabajo,
    listarTipo_Trabajo,
    borrarTipo_Trabajo,
    editTipo_Trabajo,
    infoTipo_Trabajo
}