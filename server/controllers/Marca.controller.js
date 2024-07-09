import con from '../config/database.js'

const addMarca = async(req, res) => {
    const sql = "INSERT INTO marcas (`descripcion`,`estado`) VALUES (?,'1')";
    const values = [req.body.descripcion]
    con.query(sql,[values], (err, result) => {
        if(err) return res.json({Error:"Inserting data Error in Server"});
        return res.json({Status:"Success"});
    })
}

const listarMarcas = async(req, res) => { 
    const sql = 'SELECT * FROM marcas WHERE estado = "1"'
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server marcas:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            return res.json({ Status: "Success", data });
        }
    });
}

const borrarMarca = async(req, res) => {
    const marcaId = req.params.id;
    con.query('UPDATE marcas SET estado = 0 WHERE id_marca = ?', [marcaId], (err, result) => {
        if (err) {
            console.error('Error al eliminar la marca:', err);
            return res.json({ Status: 'Error in Server' });
        }else {
            console.log("Success server marca");
            return res.json({ Status: 'Success', message: 'Marca eliminada exitosamente' });
        }
        });
}

const editMarca = async(req, res) => { //Extrae los datos para editar
    const marcaId = req.params.id;
    con.query( `SELECT * FROM marcas WHERE id_marca = ?`, [marcaId], (err, data) => {
        if (err) {
            console.log("Error in server marcas:", err)
            return res.status(500).json({ Status: "Error in Server" })
        } else {
            return res.json({ Status: "Success", data })
        }
    })
}

const actualizarMarca = async(req, res) => {//Actualiza los datos nuevos. Realiza la consulta del UPDATE
    const marcaId = req.body.id_marca;
    const updatedData = req.body; // Los nuevos datos para la marca entregada
    // Realiza una consulta SQL para actualizar la marca en la base de datos
    // Utiliza marcaId para identificar la marca a actualizar y updatedData para los nuevos valores
    con.query( `UPDATE marcas SET descripcion = ? WHERE id_marca = ?`, [updatedData.descripcion,marcaId], (err, result) => {
        if (err) {
            console.error('Error al actualizar la marca', err)
            return res.json({ Status: 'Error in Server' })
        }else{
            console.log(result)
            return res.json({ Status: 'Success', message: 'marca actualizada exitosamente' })
        }
        })
      }

export default {
    addMarca,
    listarMarcas,
    borrarMarca,
    editMarca,
    actualizarMarca,
}

