import con from '../config/database.js';

const parcelas = async(req, res) => {
    const sql = 'SELECT * FROM parcelas' 
    con.query(sql, (err, data) => {
        if (err) {
            console.log("Error in server parcelas:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else if(data)
            return res.json({ Status: "Success", data });
    });
}

const listarparcelas = async(req, res) => {
    const sql = 'SELECT e.id_parcela, e.cantidad_hectareas, e.descripcion, e.id_pais, e.id_departamento,e.id_ciudad, e.id_barrio, e.coordenadas, p.descripcion AS pais, d.descripcion AS departamento, c.descripcion AS ciudad, b.descripcion AS barrio FROM parcelas e INNER JOIN paises p ON e.id_pais = p.id_pais INNER JOIN departamentos d ON e.id_departamento = d.id_departamento INNER JOIN ciudades c ON e.id_ciudad = c.id_ciudad INNER JOIN barrios b ON e.id_barrio = b.id_barrio AND estado = "1"' 
    con.query(sql, (err, data) => {
        if (err) {
            console.log("Error in server parcelas:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else if(data)
            return res.json({ Status: "Success", data });
    });
}

const parcelaPorId = async(req, res) => {
    const parcelaId = req.params.id;
    const sql = 'SELECT e.id_parcela, e.cantidad_hectareas, e.descripcion, e.id_pais, e.id_departamento,e.id_ciudad, e.id_barrio, e.coordenadas, p.descripcion AS pais, d.descripcion AS departamento, c.descripcion AS ciudad, b.descripcion AS barrio FROM parcelas e INNER JOIN paises p ON e.id_pais = p.id_pais INNER JOIN departamentos d ON e.id_departamento = d.id_departamento INNER JOIN ciudades c ON e.id_ciudad = c.id_ciudad INNER JOIN barrios b ON e.id_barrio = b.id_barrio WHERE id_parcela = ? AND estado = "1"' 
    con.query(sql,[parcelaId], (err, data) => {
        if (err) {
            console.log("Error in server parcelas:", err);
            return res.status(500).json({ Status: "Error in Server" });
        } else if(data)
            return res.json({ Status: "Success", data });
    });
}

const addParcela = async(req, res) => {
    console.log("req.body: ",req.body)
    const cantidad_hectareas = req.body.cantidad_hectareas;
    const descripcion = req.body.descripcion;
    const id_pais = req.body.id_pais;
    const id_departamento = req.body.id_departamento;
    const id_ciudad = req.body.id_ciudad;
    const id_barrio = req.body.id_barrio; 
    const coordenadas = req.body.coordenadas;
    if (cantidad_hectareas !== null && cantidad_hectareas !== undefined) {
        const sql = "INSERT INTO parcelas (`cantidad_hectareas`, `descripcion`, `id_pais`, `id_departamento`, `id_ciudad`, `id_barrio`, `coordenadas`,`estado` ) VALUES (?, ?, ?, ?, ?, ?, ?, 1)";
        const values = [cantidad_hectareas, descripcion, id_pais, id_departamento, id_ciudad, id_barrio, JSON.stringify(coordenadas)];
        try {
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error en la consulta SQL:", err);
                    return res.status(500).json({ Error: "Error en la consulta SQL" });
                }
                console.log(result)
                return res.status(200).json({ Status: "Success" });
            });
        } catch (err) {
            console.error("Error general:", err);
            return res.status(400).json({ Status: "Error" });
        }
    } else {
        return res.status(400).json({ Error: "La cantidad de hectáreas no puede ser nula" });
    }
}

const borrarParcela = async(req, res) => {
    const parcelaId = req.params.id;
    // Realiza una consulta SQL para eliminar la carga entregada de la base de datos
    // Utiliza cargaId para identificar la parcela a eliminar
    con.query('UPDATE parcelas SET estado = "0" WHERE id_parcela = ?', [parcelaId], (err, result) => {
      if (err) {
        console.error('Error al eliminar la parcela:', err);
        return res.json({ Status: 'Error in Server' });
      }
      return res.json({ Status: 'Success', message: 'Parcela eliminada exitosamente' });
    })
}

const editParcela = async(req, res) => {
    console.log("req contiene: ",req.body.id_parcela)
    const parcelaId = req.body.id_parcela;
    const updatedData = req.body; // Los nuevos datos para la parcela entregada
    // Realiza una consulta SQL para actualizar la parcela en la base de datos
    // Utiliza parcelaId para identificar la parcela a actualizar y updatedData para los nuevos valores
    con.query( `
    UPDATE parcelas SET cantidad_hectareas = ?, direccion = ?, descripcion = ? WHERE id_parcela = ?`, [updatedData.cantidad_hectareas,updatedData.direccion, updatedData.descripcion, parcelaId], (err, result) => {
        console.log("updatedData in server ",updatedData, parcelaId)
        if (err) {
        console.error('Error al actualizar la parcela entregada:', err);
        
        return res.json({ Status: 'Error in Server' });
      }else{
        
        console.log(result)
        return res.json({ Status: 'Success', message: 'Parcela actualizada exitosamente' }), console.log("Success actualizar");
      }
    })
  }

//Coordenadas
const savePolygon = async(req, res) => {
    console.log("SavePolygon");
    const { coordinates } = req.body;
    // Verificar si coordinates contiene datos antes de la inserción
    if (!coordinates || coordinates.length === 0) {
        console.log("!coordinates || coordinates.length === 0")
        return res.status(400).json({ Status: 'Error', error: 'Coordenadas de polígono inválidas.' });
    }
    try {
        const result = await con.query('INSERT INTO ubicaciones (puntos) VALUES (?)', [JSON.stringify(coordinates)]);
        const insertedId = result.insertId;

        console.log("Try")
        // const insertedPolygon = await con.query('SELECT * FROM polygons WHERE id = ?', [insertedId]);
        
        res.status(200)
    } catch (error) {
        console.log("error en server: ",error)
        console.error(error);

        // Manejar el caso cuando las coordenadas son nulas o inválidas
        if (error.code === 'ER_BAD_NULL_ERROR') {
            return res.status(400).json({ Status: 'Error', error: 'Coordenadas de polígono inválidas.' });
        }

        res.status(500).json({ Status: 'Error', error: 'Error al guardar las coordenadas.' });
    }
}

const getCoordinates = async(req,res)=>{
    try {
        con.query('SELECT coordenadas FROM parcelas', (error, result) => {
          if (error) {
              console.error(error);
              return res.status(500).json({ success: false, error: 'Error al obtener las coordenadas.' });
            }
        
          // Filtrar y mapear las coordenadas
          const coordinates = result
            .filter(row => row.coordenadas && isValidJSON(row.coordenadas))  // Filtrar aquellos con coordenadas definido y cadena JSON válida
            .map(row => ({
              id: row.id,
              coordinates: JSON.parse(row.coordenadas),
            }));
          return res.json({ success: true, coordinates });
  
          // return res.json({ success: true, coordinates: result });
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Error al obtener las coordenadas.' });
      }
    }
// Función para verificar si una cadena es una JSON válida
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

export default {
    parcelas,
    listarparcelas,
    addParcela,
    borrarParcela,
    editParcela, 
    parcelaPorId,
    savePolygon,
    getCoordinates
}