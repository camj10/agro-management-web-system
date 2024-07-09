import con from '../config/database.js';

const ListarEgresos = async(req, res)=>{ //Extrae los datos. Consulta SELECT
    const sql = 'SELECT id_egreso, fecha, costo_por_hectarea, cantidad_hectareas, monto_egreso, cantidad_hectareas, producto, parcela, zafra FROM egresos'
    con.query(sql, (err, data) => { 
      if (err) {
        console.error('Error al obtener datos de ListarEgresos:', err);
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

const AddEgreso = async(req, res)=>{ //Extrae los datos. Consulta SELECT
    //Ver si todo vienen en el req.body o ver para hacer algunos select y obtener los datos necesarios.
    const id_producto_parcela = req.body.id_producto_parcela
    const fecha = req.body.fecha
    const precio_por_hectarea = req.body.precio_por_hectarea
    const cantidad_hectareas = req.body.cantidad_hectareas
    const producto = req.body.producto
    const parcela = req.body.parcela
    const zafra = req.body.zafra
    //   id_egreso	id_producto_parcela	fecha	precio_por_hectarea	cantidad_hectareas	producto parcela zafra
    con.query('INSERT INTO egresos ( `id_producto_parcela`,`fecha`, `precio_por_hectarea`, `cantidad_hectareas`, `producto`, `parcela`, `zafra`) VALUES (?, ?, ?, ?, ?, ?, ?)', [id_producto_parcela, fecha, precio_por_hectarea, cantidad_hectareas, producto, parcela, zafra], (err, data) => {
        if (err) {
          console.error('Error al obtener datos de producto_parcela:', err);
          return res.json({ Status: 'Error in Server' });
        } 
    
        if (data.length > 0) {
          console.log("data en get EditProdParcela: ",data)
          return res.json({ Status: 'Success', data: data[0] }); // Devuelve solo el primer resultado (debería ser único por ID)
        } else {
          return res.json({ Status: 'No data found' });
        }
      })
}



export default {
    ListarEgresos
}