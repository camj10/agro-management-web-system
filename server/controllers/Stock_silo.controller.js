import con from '../config/database.js';

const AddStockSilo = async(req, res)=>{
    console.log("req.body: ",req.body)
    const id_empresa_silo = req.body[0].id_empresa_silo;
    const cantidad = req.body[0].cantidad;
    console.log("id_empresa_silo: ",id_empresa_silo)
    console.log("cantidad: ",cantidad)
    const sql = "INSERT INTO stock_silo (`id_empresa_silo`, `cantidad`, `estado`) VALUES (?, ?, ?)";
    const values = [id_empresa_silo, cantidad, 1];
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

const VerStockSilo = async(req, res)=>{
    const sql = 'SELECT e.id_stock_silo, e.id_empresa_silo, e.cantidad, s.nombre AS empresa_silo FROM stock_silo e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo WHERE e.estado = 1'
    //Los nombres dados al renombrar deberán ser utilizados en el client. Ej: id_marca será marca
    con.query(sql, (err, data) => { 
      if (err) {
        console.error('Error al obtener datos de empresa_silo:', err);
        return res.json({ Status: 'Error in Server' }); 
      }
      if (data.length > 0) {
        // Si se encontraron datos, responde con un estado exitoso y los datos
        return res.json({ Status: 'Success', data });
      } else {
        return res.json({ Status: 'Success', data: null });
      }
    })
}

const VerStockSiloPorId = async(req, res)=>{
    const stock_siloId = req.params.id;

    con.query('SELECT e.id_stock_silo, e.id_empresa_silo, e.cantidad, s.nombre AS empresa_silo FROM stock_silo e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo WHERE id_stock_silo = ? AND e.estado = 1', [stock_siloId], (err, data) => {
      if (err) {
        console.error('Error al obtener datos de stock_silo:', err);
        return res.json({ Status: 'Error in Server' });
      } 
  
      if (data.length > 0) {
        return res.json({ Status: 'Success', data: data[0] }); // Devuelve solo el primer resultado (debería ser único por ID)
      } else {
        return res.json({ Status: 'No data found' });
      }
    })
}

const VerStockSiloPorEmpresa = async(req, res)=>{
  console.log("req.params.id: ",req.params.id)
  const empresa_siloId = req.params.id;
  console.log("empresa_siloId: ",empresa_siloId)
  con.query('SELECT e.id_stock_silo, e.id_empresa_silo, e.cantidad, s.nombre AS empresa_silo FROM stock_silo e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo WHERE e.id_empresa_silo = ? AND e.estado = 1', [empresa_siloId], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de stock_silo:', err);
      return res.json({ Status: 'Error in Server' });
    } 

    if (data.length > 0) {
      console.log("data en stockPorEmpresa: ",data)
      return res.json({ Status: 'Success', data: data[0] }); // Devuelve solo el primer resultado (debería ser único por ID)
    } else {
      return res.json({ Status: 'Success', data: null });
    }
  })
}

//Viene por litro 
//1 litro está por ejemplo 30dólares*0.3 en dosis => Precio = 9 usd* hectárea
//Costo por hectárea
//El costo es precio*dosis
//Dosis cc y gr 
//Precio por litro y kg => Ahí hacer la conversión cuando se ingresa por primera vez
//El costo es por hectárea, entonces si uso hectáreas en productos en parcela, voy a tener que poner la cantidad de hectáreas que usé 
const AddCantidadStockSilo = async(req, res)=>{
  const stock_siloId = req.params.id;
  console.log("req.body[0].cantidadASumar: ",req.body[0].cantidadASumar)
  console.log("stock_siloId: ",stock_siloId)
  const cantidadASumar = req.body[0].cantidadASumar
  console.log("cantidadASumar: ",cantidadASumar)

  con.query( `UPDATE stock_silo SET cantidad = ? WHERE id_stock_silo = ?`, [cantidadASumar,stock_siloId], (err, result) => {
      if (err) {
          console.log("err: ",err)
          return res.json({ Status: 'Error in Server' });
      }else{
          console.log("exitoso")
          return res.json({ Status: 'Success', message: 'cantidad añadida exitosamente' }), console.log("Success actualizar");
      } 
  })
}


export default {
    AddStockSilo,
    VerStockSilo,
    VerStockSiloPorId,
    VerStockSiloPorEmpresa,
    AddCantidadStockSilo
}