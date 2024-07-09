import con from '../config/database.js';

const addProducto = async(req, res)=>{
    console.log("req.body: ",req.body)
    const descripcion = req.body.descripcion;
    const id_tipo_producto = req.body.id_tipo_producto;
    const principios_activos = req.body.principios_activos;
    const dosis = req.body.dosis;
    const id_marca = req.body.id_marca;
    const id_empresa_proveedora = req.body.id_empresa_proveedora;
    const cantidad = req.body.cantidad;
    const id_unidad_medida = req.body.id_unidad_medida;
    const precio = req.body.precio;

    const costo_por_hectarea = precio * dosis

    const sql = "INSERT INTO productos (`descripcion`, `id_tipo_producto`, `principios_activos`, `dosis`, `id_marca`, `id_empresa_proveedora`, `stock`, `id_unidad_medida`, `precio`, `costo_por_hectarea`, `estado`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [descripcion, id_tipo_producto, principios_activos, dosis, id_marca, id_empresa_proveedora, cantidad, id_unidad_medida, precio, costo_por_hectarea, 1];
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

const productos = async(req, res)=>{
    const sql = 'SELECT e.id_producto, e.descripcion, e.principios_activos, e.dosis, e.stock, e.precio, e.costo_por_hectarea, e.estado, t.nombre AS tipo_producto, m.descripcion AS marca, p.nombre AS empresa_proveedora, u.descripcion AS unidad_medida FROM productos e INNER JOIN tipos_productos t ON e.id_tipo_producto = t.id_tipo_producto INNER JOIN marcas m ON e.id_marca = m.id_marca INNER JOIN empresas_proveedoras p ON e.id_empresa_proveedora = p.id_empresa_proveedora INNER JOIN unidades_medida u ON e.id_unidad_medida = u.id_unidad_medida WHERE e.estado = 1'
    //Los nombres dados al renombrar deberán ser utilizados en el client. Ej: id_marca será marca
    con.query(sql, (err, data) => { 
      if (err) {
        console.error('Error al obtener datos de productos:', err);
        return res.json({ Status: 'Error in Server' }); 
      }
      if (data.length > 0) {
        // Si se encontraron datos, responde con un estado exitoso y los datos
        return res.json({ Status: 'Success', data });
      } else {
        console.log("err: ",err)
        return res.json({ Status: 'No data found' });
      }
    })
}

const productoEdit = async(req, res)=>{
    console.log("get producto con id - req.params.id: ",req.params.id)
    const productoId = req.params.id;

    con.query('SELECT e.id_producto, e.descripcion, e.id_tipo_producto, e.principios_activos, e.dosis, e.id_marca, e.id_empresa_proveedora, e.stock, e.id_unidad_medida, e.precio, t.nombre AS tipo_producto, m.descripcion AS marca, p.nombre AS empresa_proveedora, u.descripcion AS unidad_medida FROM productos e INNER JOIN tipos_productos t ON e.id_tipo_producto = t.id_tipo_producto INNER JOIN marcas m ON e.id_marca = m.id_marca INNER JOIN empresas_proveedoras p ON e.id_empresa_proveedora = p.id_empresa_proveedora INNER JOIN unidades_medida u ON e.id_unidad_medida = u.id_unidad_medida WHERE id_producto = ? AND e.estado = 1', [productoId], (err, data) => {
      if (err) {
        console.error('Error al obtener datos de productos:', err);
        return res.json({ Status: 'Error in Server' });
      } 
  
      if (data.length > 0) {
        return res.json({ Status: 'Success', data: data[0] }); // Devuelve solo el primer resultado (debería ser único por ID)
      } else {
        return res.json({ Status: 'No data found' });
      }
    })
}

const producto = async(req, res)=>{
    console.log("get producto con id - req.params.id: ",req.params.id)
    const productoId = req.params.id;
  
    con.query('SELECT * FROM productos WHERE id_producto = ?', [productoId], (err, data) => {
      if (err) {
        console.error('Error al obtener datos de productos:', err);
        return res.json({ Status: 'Error in Server' });
      } 
  
      if (data.length > 0) {
        return res.json({ Status: 'Success', data: data[0] }); 
      } else {
        return res.json({ Status: 'No data found' });
      }
    })
}

const productoUpdate = async(req, res)=>{
  const productoId = req.body.id_producto;
  const updatedData = req.body; // Los nuevos datos para el producto 

  const precio = req.body.precio;
  const dosis = req.body.dosis;
  const costo_por_hectarea = precio * dosis

  con.query( `UPDATE productos SET descripcion = ?, id_tipo_producto = ?, principios_activos = ?, dosis = ?, id_marca = ?, id_empresa_proveedora = ?, stock = ?, id_unidad_medida = ?, precio = ?, costo_por_hectarea = ? WHERE id_producto = ?`, [updatedData.descripcion, updatedData.id_tipo_producto, updatedData.principios_activos, updatedData.dosis, updatedData.id_marca, updatedData.id_empresa_proveedora, updatedData.cantidad,updatedData.id_unidad_medida, updatedData.precio, costo_por_hectarea, productoId], (err, result) => {
      if (err) {
          console.log("err: ",err)
          return res.json({ Status: 'Error in Server' });
      }else{
          console.log("exitoso")
          return res.json({ Status: 'Success', message: 'producto actualizado exitosamente' }), console.log("Success actualizar");
      } 
  })
}

const eliminarProducto = async(req, res)=>{
  const productoId = req.params.id;
  con.query( `UPDATE productos SET estado = ? WHERE id_producto = ?`, [0,productoId], (err, result) => {
      if (err) {
          console.log("err: ",err)
          return res.json({ Status: 'Error in Server' });
    }else{
          console.log("result: ",result)
          return res.json({ Status: 'Success', message: 'Producto desactivado' }), console.log("Success actualizar");
    }
  })
}

const addStockProducto = async(req, res)=>{
  console.log("req.body: ",req.body)
  const productoId = req.body.id_producto

  con.query('SELECT stock FROM productos WHERE id_producto = ? AND estado = 1', [productoId], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de productos:', err);
      return res.json({ Status: 'Error in Server' });
    } 

    if (data.length > 0) {
      //Si tiene datos, actualizo con la nueva cantidad
      console.log("data: ",data)
      console.log("data[0].stock: ",data[0].stock)
      const stock = Number(req.body.cantidad) + Number(data[0].stock)
      console.log("stock: ",stock)
      con.query( `UPDATE productos SET stock = ? WHERE id_producto = ?`, [stock,productoId], (err, result) => {
          if (err) {
              console.log("err: ",err)
              return res.json({ Status: 'Error in Server' });
        }else{
              console.log("result: ",result)
              return res.json({ Status: 'Success', message: 'Producto desactivado' }), console.log("Success actualizar");
        }
      })
    } else {
      return res.json({ Status: 'No data found' });
    }
  })
}
  
export default {
    addProducto,
    productos,
    productoEdit,
    producto,
    productoUpdate,
    eliminarProducto,
    addStockProducto
}