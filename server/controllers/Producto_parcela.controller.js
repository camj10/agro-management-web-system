import con from '../config/database.js';

const productosParcelas = async(req, res)=>{
  console.log("Ingresa a /productosParcelas")
  try {
    con.query( `SELECT e.id_producto_parcela, e.fecha, e.id_producto, e.cantidad, e.precio_producto, e.id_tipo_trabajo, e.id_parcela, e.id_zafra, e.estado, p.descripcion AS producto, t.descripcion as tipo_trabajo, a.descripcion AS parcela, z.descripcion as zafra FROM productos_parcelas e INNER JOIN productos p ON e.id_producto = p.id_producto INNER JOIN tipos_trabajos t ON e.id_tipo_trabajo = t.id_tipo_trabajo INNER JOIN parcelas a ON e.id_parcela = a.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE e.estado = "1"`, (err, data) => {
        if (err) {
            console.error("Error en la consulta SQL:", err);
            return res.status(500).json({ Error: "Error en la consulta SQL" });
        }
        console.log("res")
        return res.status(200).json({ Status: "Success", data });
    });
  } catch (err) {
      console.error("Error:", err);
      return res.status(400).json({ Status: "Error" });
  }
}

const addProductoParcela = async(req, res)=>{
  console.log("Ingresa a /AddProductoParcela")
  const fecha = req.body.fecha;
  const id_producto = req.body.id_producto;
  const cantidad = req.body.cantidad;
  const id_tipo_trabajo = req.body.id_tipo_trabajo;
  const id_parcela = req.body.id_parcela;
  const id_zafra = req.body.id_zafra;

  con.query('SELECT * FROM productos WHERE id_producto = ?', [id_producto], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de producto_parcela:', err);
      return res.json({ Status: 'Error in Server' });
    } 

    if (data.length > 0) { //Si el resultado tiene contenido, procedemos a insertar el registro
      console.log("data al volver de select producto: ",data)  
      const precio_producto = data[0].precio
      const stockProducto = data[0].stock
      const costo_por_hectarea = data[0].costo_por_hectarea
      console.log("costo_por_hectarea: ",costo_por_hectarea) 
      const descripcionProducto = data[0].descripcion
      if(stockProducto>=cantidad){
        const sql = "INSERT INTO productos_parcelas (`fecha`, `id_producto`, `cantidad`, `precio_producto`, `id_tipo_trabajo`, `id_parcela`, `id_zafra`, `estado`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [fecha, id_producto, cantidad, precio_producto, id_tipo_trabajo, id_parcela, id_zafra, '1'];
        try {
            con.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Error en la consulta SQL:", err);
                    return res.status(500).json({ Error: "Error en la consulta SQL" });
                }
                //Si se inserta una nueva aplicacion de producto en parcela. Se resta del stock de ese producto
                const stockActual = stockProducto - cantidad 
                con.query( `UPDATE productos SET stock = ? WHERE id_producto = ?`, [stockActual,id_producto], (err, result) => {
                  if (err) {
                      console.log("err: ",err)
                      return res.json({ Status: 'Error in Server' });
                  }else{
                    //En caso de realzar una aplicación en parcela también necesitamos añadir un egreso.

                    con.query('SELECT cantidad_hectareas, descripcion FROM parcelas WHERE id_parcela = ?', [id_parcela], (err, dataParcela) => {
                      if (err) {
                        console.error('Error al obtener datos de producto_parcela:', err);
                        return res.json({ Status: 'Error in Server' });
                    } 
                    const cantidad_hectareas = dataParcela[0].cantidad_hectareas
                    console.log("cantidad_hectareas: ",cantidad_hectareas)

                    console.log("costo_por_hectarea:  ",costo_por_hectarea)

                    const monto_egreso = costo_por_hectarea * cantidad_hectareas
                    console.log("monto_egreso: ",monto_egreso)

                    const descripcionParcela = dataParcela[0].descripcion
                    console.log("descripcionParcela: ",descripcionParcela)

                    
                    con.query('SELECT descripcion FROM zafras WHERE id_zafra = ?', [id_zafra], (err, dataZafra) => {
                      if (err) {
                        console.error('Error al obtener datos de producto_parcela:', err);
                        return res.json({ Status: 'Error in Server' });
                      } 
                       
                      const descripcionZafra = dataZafra[0].descripcion
                      console.log("descripcionZafra: ",descripcionZafra)


                      con.query('INSERT INTO egresos (`fecha`, `costo_por_hectarea`, `cantidad_hectareas`, `monto_egreso`, `producto`, `parcela`, `zafra`) VALUES (?, ?, ?, ?, ?, ?, ?)', [fecha, costo_por_hectarea, cantidad_hectareas, monto_egreso, descripcionProducto, descripcionParcela, descripcionZafra ], (err, result) => {
                        if (err) {
                          console.error('Error al obtener datos de producto_parcela:', err);
                          return res.json({ Status: 'Error in Server' });
                        } 
                        return res.status(200).json({ Status: "Success", message:"addProductoParcela correcto" });
                      })
                    })
                    })
                  } 
              })
            });
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).json({ Status: "Error" });
        }
      }else{
        return res.status(200).json({ Status: "Excede", message:"Ya no existe producto suficiente" });
      }

    } else {
      return res.json({ Status: 'No data found' });
    }
  })

}

const productoParcelaEdit = async(req, res)=>{
  const productoParcelaId = req.params.id;
  console.log("productoParcelaId: ",productoParcelaId)

  con.query('SELECT e.id_producto_parcela, e.fecha, e.id_producto,e.cantidad, e.precio_producto, e.id_tipo_trabajo, e.id_parcela, e.id_zafra, p.descripcion AS producto, t.descripcion AS tipo_trabajo, a.descripcion AS parcela, z.descripcion AS zafra FROM productos_parcelas e INNER JOIN productos p ON e.id_producto = p.id_producto INNER JOIN tipos_trabajos t ON e.id_tipo_trabajo = t.id_tipo_trabajo INNER JOIN parcelas a ON e.id_parcela = a.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE id_producto_parcela = ? AND e.estado=1', [productoParcelaId], (err, data) => {
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

const productoParcela = async(req, res)=>{
  const productoParcelaId = req.params.id;

  con.query('SELECT * FROM productos_parcelas WHERE id_producto_parcela = ?', [productoParcelaId], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de producto parcela:', err);
      return res.json({ Status: 'Error in Server' });
    } 

    if (data.length > 0) {
      return res.json({ Status: 'Success', data: data[0] }); 
    } else {
      return res.json({ Status: 'No data found' });
    }
  })
}

const productoParcelaUpdate = async(req, res)=>{
  const productoParcelaId = req.body.id_producto_parcela;
  const updatedData = req.body; // Los nuevos datos para producto_parcela
  console.log("updatedData: " ,updatedData)
  const id_producto = req.body.id_producto;
  const cantidadAntigua =  updatedData.cantidadAntigua
  console.log("cantidadAntigua: ",cantidadAntigua)
  const cantidadNueva = updatedData.cantidad
  con.query('SELECT id_producto, stock, precio FROM productos WHERE id_producto = ?', [id_producto], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de producto_parcela:', err);
      return res.json({ Status: 'Error in Server' });
    } 
    if (data.length > 0) {
      const precio_producto = data[0].precio
      console.log("updatedData en put prod parc: ",updatedData)
      const stockProducto = data[0].stock
      console.log("stockProducto: ",stockProducto)
      con.query( `UPDATE productos_parcelas SET fecha = ?, id_producto = ?, cantidad = ?, precio_producto = ?, id_tipo_trabajo = ?, id_parcela = ? WHERE id_producto_parcela = ?`, [updatedData.fecha, updatedData.id_producto, updatedData.cantidad,precio_producto, updatedData.id_tipo_trabajo, updatedData.id_parcela, productoParcelaId], (err, result) => {
          if (err) {
              console.log("err: ",err)
              return res.json({ Status: 'Error in Server' });
          }else{
            const cantidadAactualizar = cantidadNueva>cantidadAntigua? cantidadNueva-cantidadAntigua: cantidadNueva<cantidadAntigua ? cantidadNueva-cantidadAntigua : cantidadNueva
            console.log("cantidadAactualizar: ",cantidadAactualizar)
            console.log("stockProducto: ",stockProducto)
            const stockActual = stockProducto - cantidadAactualizar 
            console.log("stockActual: ",stockActual)
            con.query( `UPDATE productos SET stock = ? WHERE id_producto = ?`, [stockActual,id_producto], (err, result) => {
                if (err) {
                    console.log("err: ",err)
                    return res.json({ Status: 'Error in Server' });
                }else{
                    console.log("exitoso")
                    return res.json({ Status: 'Success', message: 'cantidad añadida exitosamente' }), console.log("Success actualizar");
                } 
            })
        }
      })
    } else {
      return res.json({ Status: 'No data found' });
    }

})}

const eliminarProductoParcela = async(req, res)=>{
  console.log("Ingres a /eliminarProductoParcela")
    const productoParcelaId = req.params.id;
    con.query( `UPDATE productos_parcelas SET estado = ? WHERE id_producto_parcela = ?`, [0,productoParcelaId], (err, result) => {
        if (err) {
            console.log("err: ",err)
            return res.json({ Status: 'Error in Server' });
      }else{
            console.log("result: ",result)
            return res.json({ Status: 'Success', message: 'Producto_parcela desactivado' }), console.log("Success actualizar");
      }
    })
}
  
export default {
    productosParcelas,
    addProductoParcela,
    productoParcelaEdit,
    productoParcela,
    productoParcelaUpdate,
    eliminarProductoParcela
}