import con from '../config/database.js';

const empresas_silos = async(req, res)=>{
    const sql = 'SELECT * FROM empresas_silos';
    con.query(sql,(err, data) => {
        if (err) {
            console.log("Error in server empresas_silos:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else {
            console.log("Success server empresas_silos");
            return res.json({ Status: "Success", data });
        }
    })
}

const addEmpresaSilo = async(req, res)=>{
    console.log("req.body: ",req.body)
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const id_pais = req.body.id_pais;
    const id_departamento = req.body.id_departamento;
    const id_ciudad = req.body.id_ciudad;
    const id_barrio = req.body.id_barrio;
    const email = req.body.email;
    const direccion = req.body.direccion;

    const sql = "INSERT INTO empresas_silos (`nombre`, `telefono`, `id_pais`, `id_departamento`, `id_ciudad`, `id_barrio`, `email`, `direccion`, `estado`) VALUES (?,?,?,?,?,?,?,?,'1')";
    const values = [nombre, telefono, id_pais, id_departamento, id_ciudad, id_barrio, email, direccion];
    try {
        con.query(sql, values, (err, result) => {
            if (err) {
                console.error("Error en la consulta SQL:", err);
                return res.status(500).json({ Error: "Error en la consulta SQL" });
            }
            return res.status(200).json({ Status: "Success" });
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(400).json({ Status: "Error" });
    }
}

const empresasSilos = async(req, res)=>{
    const sql = 'SELECT e.id_empresa_silo, e.nombre, e.telefono, e.id_pais, e.id_departamento, e.id_ciudad, e.id_barrio, e.email, e.direccion, p.descripcion AS pais, d.descripcion AS departamento, c.descripcion AS ciudad, b.descripcion AS barrio FROM empresas_silos e INNER JOIN paises p ON e.id_pais = p.id_pais INNER JOIN departamentos d ON e.id_departamento = d.id_departamento INNER JOIN ciudades c ON e.id_ciudad = c.id_ciudad INNER JOIN barrios b ON e.id_barrio = b.id_barrio AND estado = "1"' 

    //Los nombres dados al renombrar deberán ser utilizados en el client. Ej: id_pais será pais
    con.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener datos de empresas silos:', err);
        return res.json({ Status: 'Error in Server' }); 
      }  
      if (data.length > 0) {
        // Si se encontraron datos, responde con un estado exitoso y los datos
        return res.json({ Status: 'Success', data });
      } else {
        // Si no se encontraron datos, puedes responder con un mensaje adecuado
        return res.json({ Status: 'No data found' });
      }
    })
}



export default {
    empresas_silos, //No
    addEmpresaSilo, 
    empresasSilos
}