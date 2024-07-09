import con from '../config/database.js';

const addEntrega_cargas = async(req, res)=>{
  console.log("Ingresa al server entrega_cargas");
  const sql = "INSERT INTO entrega_de_cargas (`fecha`,`toneladas_entregadas`, `numero_de_entrega`, `id_empresa_silo`, `id_calidad_grano`, `id_parcela`, `id_zafra`, `vendido`,  `estado`) VALUES (?)";
  const values = [
      req.body.fecha,
      req.body.toneladas_entregadas,
      req.body.numero_de_entrega,
      req.body.id_empresa_silo,
      req.body.id_calidad_grano,
      req.body.id_parcela,
      req.body.id_zafra,
      0,
      1
  ];
  con.query(sql, [values], (err, result) => {
      if (err) {
          console.error("Error inserting data in Server:", err);
          console.log("Error al insertar valores de nueva carga");
          return res.status(500).json({ Error: "Error al insertar valores de nueva carga" });
      } else if (result.affectedRows > 0) {
          console.log("Success Inserting data in Server - Nueva carga");
          return res.json({ Status: "Success" });
      } else {
          console.log("No se insertaron filas en la base de datos");
          return res.status(500).json({ Error: "No se insertaron filas en la base de datos" });
      }
  })
}

const entrega_cargas = async(req, res)=>{ //Extrae los datos. Consulta SELECT
    const sql = 'SELECT e.id_entrega_de_carga, e.fecha, e.toneladas_entregadas, e.numero_de_entrega, e.id_empresa_silo, e.id_calidad_grano, e.id_parcela, e.id_zafra, e.vendido, s.nombre AS empresa_silo, g.descripcion AS calidad_grano, p.descripcion AS parcela, z.descripcion as zafra FROM entrega_de_cargas e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo INNER JOIN calidades_granos g ON e.id_calidad_grano = g.id_calidad_grano INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE e.estado = 1'
    con.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener datos de entrega_cargas:', err);
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

const entrega_cargasParaIngreso = async(req, res)=>{ //Extrae los datos. Consulta SELECT
  const sql = 'SELECT e.id_entrega_de_carga, e.fecha, e.toneladas_entregadas, e.numero_de_entrega, e.id_empresa_silo, e.id_calidad_grano, e.id_parcela, e.id_zafra, e.vendido, s.nombre AS empresa_silo, g.descripcion AS calidad_grano, p.descripcion AS parcela, z.descripcion as zafra FROM entrega_de_cargas e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo INNER JOIN calidades_granos g ON e.id_calidad_grano = g.id_calidad_grano INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE e.estado = 1 AND e.vendido = 0'
  con.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener datos de entrega_cargas:', err);
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

const entrega_cargasInfo = async(req, res)=>{ //Extrae los datos según el id. Utilizado para editar 
  console.log("req.params.id: ",req.params.id)
  const cargaId = req.params.id;
  // Realiza una consulta SQL para obtener los datos de la carga entregada por su ID
  // Utiliza cargaId para identificar la carga específica
  con.query('SELECT e.id_entrega_de_carga, e.fecha, e.toneladas_entregadas, e.numero_de_entrega, e.id_empresa_silo, e.id_calidad_grano, e.id_parcela, e.id_zafra, e.vendido, s.nombre AS empresa_silo, g.descripcion AS calidad_grano, p.descripcion AS parcela, z.descripcion as zafra FROM entrega_de_cargas e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo INNER JOIN calidades_granos g ON e.id_calidad_grano = g.id_calidad_grano INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE  id_entrega_de_carga = ?', [cargaId], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de entrega_cargas:', err);
      return res.json({ Status: 'Error in Server' });
    }
    if (data.length > 0) {
      // Si se encontraron datos, responde con un estado exitoso y los datos
      return res.json({ Status: 'Success', data: data[0] }); // Devuelve solo el primer resultado (debería ser único por ID)
    } else {
      // Si no se encontraron datos, puedes responder con un mensaje adecuado
      return res.json({ Status: 'No data found' });
    }
  })
}

const entrega_cargasUpdate = async(req, res)=>{ 
  console.log("req.body en edit: ",req.body)
  const cargaId = req.body.id_entrega_de_carga;
  const updatedData = req.body; // Los nuevos datos para la carga entregada
  // Realiza una consulta SQL para actualizar la carga entregada en la base de datos
  // Utiliza cargaId para identificar la carga a actualizar y updatedData para los nuevos valores
  con.query( `UPDATE entrega_de_cargas SET fecha = ?, toneladas_entregadas = ?, numero_de_entrega = ?, id_empresa_silo = ?, id_calidad_grano = ?, id_parcela = ? , id_zafra = ? WHERE id_entrega_de_carga = ?`, [updatedData.fecha, updatedData.toneladas_entregadas,updatedData.numero_de_entrega, updatedData.id_empresa_silo,updatedData.id_calidad_grano, updatedData.id_parcela, updatedData.id_zafra, cargaId], (err, result) => {
      console.log("updatedData in server ",updatedData, cargaId)
      if (err) {
      console.error('Error al actualizar la carga entregada:', err);
      
      return res.json({ Status: 'Error in Server' });
    }else{
      
      console.log(result)
      return res.json({ Status: 'Success', message: 'Carga entregada actualizada exitosamente' }), console.log("Success actualizar");
    }
  })
}

const entrega_cargasDelete = async(req, res)=>{ //Extrae los datos según el id. Utilizado para editar 
  const cargaId = req.params.id;
    // Realiza una consulta SQL para eliminar la carga entregada de la base de datos
    // Utiliza cargaId para identificar la carga a eliminar
  con.query('DELETE FROM entrega_de_cargas WHERE id_entrega_de_carga = ?', [cargaId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la carga entregada:', err);
      return res.json({ Status: 'Error in Server' });
    }

    return res.json({ Status: 'Success', message: 'Carga entregada eliminada exitosamente' });
  })
}

const AddVendidoEntregaCarga = async(req, res)=>{
  const cargaId = req.params.id;
  console.log("cargaId: ",cargaId)

  con.query( `UPDATE entrega_de_cargas SET vendido = ? WHERE id_entrega_de_carga = ?`, [1,cargaId], (err, result) => {
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
    addEntrega_cargas,
    entrega_cargas,
    entrega_cargasInfo, 
    entrega_cargasUpdate, 
    entrega_cargasDelete,
    AddVendidoEntregaCarga,
    entrega_cargasParaIngreso
}