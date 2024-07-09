import con from '../config/database.js'

const insertarBarrio = async(req, res)=>{
    const sql = "INSERT INTO barrios (`descripcion`) VALUES (?)";
        const values = [
            req.body.descripcion, 
        ]
        con.query(sql,[values], (err, result) => {
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
        })
}

const listarBarrios = async(req, res)=>{
    const sql = 'SELECT * FROM barrios';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server barrios:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server barrios");
            return res.json({ Status: "Success", data });
        }
    });
}

const editBarrio = async(req, res)=>{
    console.log("req contiene: ",req.body.id_barrio)
    const barrioId = req.body.id_id_barrio;
    const updatedData = req.body; // Los nuevos datos para la Tipo_Trabajo entregada
    // Realiza una consulta SQL para actualizar la Tipo_Trabajo en la base de datos
    // Utiliza barrioId para identificar la barrio a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE barrios SET descripcion = ?`, [updatedData.descripcion], (err, result) => {
        console.log("updatedData in server ",updatedData, barrioId)
        if (err) {
            console.error('Error al actualizar el barrio', err);
            return res.json({ Status: 'Error in Server' });
        }else{
            console.log(result)
            return res.json({ Status: 'Success', message: 'Barrio actualizado exitosamente' }), console.log("Success actualizar");
        }
        });
      }
export default {
    insertarBarrio, 
    listarBarrios, 
    editBarrio
}