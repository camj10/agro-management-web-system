import con from '../config/database.js';

const insertarCiudad = async(req, res)=>{
    const sql = "INSERT INTO ciudades (`descripcion`) VALUES (?)";
        const values = [
            req.body.descripcion, 
        ]
        con.query(sql,[values], (err, result) => {
            if(err) return res.json({Error:"Inserting data Error in Server"});
            return res.json({Status:"Success"});
        })
}

const listarCiudades = async(req, res)=>{
    const sql = 'SELECT * FROM ciudades';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server ciudades:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server ciudades");
            return res.json({ Status: "Success", data });
        }
    })
}

const editCiudad = async(req, res)=>{
    console.log("req contiene: ",req.body.id_ciudad)
    const ciudadId = req.body.id_id_ciudad;
    const updatedData = req.body; // Los nuevos datos para la ciudad
    // Realiza una consulta SQL para actualizar la ciudad en la base de datos
    // Utiliza ciudadId para identificar la ciudad a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE ciudades SET descripcion = ?`, [updatedData.descripcion], (err, result) => {
        console.log("updatedData in server ",updatedData, ciudadId)
        if (err) {
            console.error('Error al actualizar la ciudad', err);
            return res.json({ Status: 'Error in Server' });
        }else{
            console.log(result)
            return res.json({ Status: 'Success', message: 'Ciudad actualizada exitosamente' }), console.log("Success actualizar");
        }
        })
      }


export default {
    insertarCiudad, 
    listarCiudades, 
    editCiudad
}