import con from '../config/database.js';
import { Router } from "express"
const router = Router()
 
const AddIngreso = async(req, res)=>{
    const cargaId = req.body.id_entrega_de_carga
    console.log("cargaId: ",cargaId)
    // router.get(`/entrega_cargasInfo/${(req.body.id_entrega_de_carga)}`, verifyUser, (err, result) => {
        con.query('SELECT e.id_entrega_de_carga, e.fecha, e.toneladas_entregadas, e.numero_de_entrega, e.id_empresa_silo, e.id_calidad_grano, e.id_parcela, e.id_zafra, e.vendido, s.nombre AS empresa_silo, g.descripcion AS calidad_grano, p.descripcion AS parcela, z.descripcion as zafra FROM entrega_de_cargas e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo INNER JOIN calidades_granos g ON e.id_calidad_grano = g.id_calidad_grano INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE  id_entrega_de_carga = ?', [cargaId], (err, data) => {
        if (err) {
          console.error('Error al obtener datos de entrega_cargas:', err);
          return res.json({ Status: 'Error in Server' });
        }
        if (data.length > 0) {
            console.log("DATA.LENGTH >0 ")
            const dataEntregaCarga = data[0]
            if( dataEntregaCarga.vendido==0){//En caso de existir y no estar vendido: se calcula el total de ingreso y se inserta en la tabla de ingresos 
                console.log("dataEntregaCarga.toneladas_entregadas: ",dataEntregaCarga.toneladas_entregadas)
                const total_ingreso = dataEntregaCarga.toneladas_entregadas * req.body.precio_venta
                const id_parcela = dataEntregaCarga.id_parcela
                const id_zafra = dataEntregaCarga.id_zafra
                console.log("total_ingreso: ",total_ingreso)
                console.log("id_parcela: ",id_parcela)
                console.log("id_zafra: ",id_zafra)
                //Con lo que me retorna en el data del select de parcelas, voy a usar data.toneladas entregadas (const cantidad = data.toneladas entregadas) para calcular el total ingreso a insetar en INSERT ingresos  
                
                const sql = "INSERT INTO ingresos (`precio_venta`, `total_ingreso`, `id_entrega_de_carga`, `fecha`, `id_parcela`, `id_zafra`, `estado`) VALUES (?, ?, ?, ?, ?, ?, ?)"
                const values = [
                    req.body.precio_venta,
                    total_ingreso,
                    req.body.id_entrega_de_carga,
                    req.body.fecha,
                    id_parcela,
                    id_zafra,
                    1
                ]
                con.query(sql,values, (err, data) => {
                    if (err) {
                      console.error('Error al insertar nuevo ingreso:', err);
                      return res.json({ Status: 'Error in Server' });
                    }else{ if(data){
                        console.log("data de INSERT stock_silo: ",data)
                        const sql = `UPDATE entrega_de_cargas SET vendido = ? WHERE id_entrega_de_carga = ?`;
                        const values = [1,cargaId]
                        con.query(sql,values, (err, result) => {
                            if (err) {
                              console.error('Error al actualizar entrega de cargas a vendido:', err);
                              return res.json({ Status: 'Error in Server' });
                            }else if(result){
                                console.log('Entrega de cargas actualizado a vendido:')
                                return res.json({ Status: 'Success' })
                            }
            
                          })
                    }}
                })
            }else{
                console.log('La entrega de cargas ya está vendida:')
                return res.json({ Status: 'Vendido' })
            }
        } else {
            
            console.log("DATA.LENGTH < 0 ")
            return res.json({ Status: 'No data found' })
        }
        })
}

const ListarIngreso = async(req, res)=>{ //Extrae los datos. Consulta SELECT
  console.log("Ingresa a /ListarIngreso")
    const sql = 'SELECT e.id_ingreso, e.precio_venta, e.total_ingreso, e.id_entrega_de_carga, e.fecha, e.id_parcela, e.id_zafra, c.numero_de_entrega AS entrega_de_carga, p.descripcion AS parcela, z.descripcion AS zafra FROM ingresos e INNER JOIN entrega_de_cargas c ON e.id_entrega_de_carga = c.id_entrega_de_carga INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE e.estado = 1'
    con.query(sql, (err, data) => {
      if (err) {
        console.error('Error al obtener datos de ListarIngreso:', err);
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

const ingresoEdit = async(req, res)=>{
  console.log("get ingresoEdit")
  console.log("req.params",req.params)
  const ingresoId = req.params.id;
  console.log("ingresoId: ",ingresoId)

  con.query('SELECT e.id_ingreso, e.precio_venta, e.total_ingreso, e.fecha, e.id_entrega_de_carga, e.id_parcela, e.id_zafra, c.numero_de_entrega AS entrega_de_carga, p.descripcion AS parcela, z.descripcion AS zafra FROM ingresos e INNER JOIN entrega_de_cargas c ON e.id_entrega_de_carga = c.id_entrega_de_carga INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE id_ingreso = ? AND e.estado= 1', [ingresoId], (err, data) => {
    if (err) {
      console.error('Error al obtener datos de ingreso:', err);
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

const ingreso = async(req, res)=>{
  console.log("Ingresa a UPDATE ingreso")  
  console.log("req.body.id_entrega_de_cargaAnterior: ",req.body.id_entrega_de_cargaAnterior)
  const id_entrega_de_cargaAnterior = req.body.id_entrega_de_cargaAnterior

  const productoParcelaId = req.body.id_producto_parcela;
  const updatedData = req.body; // Los nuevos datos para producto_parcela
  const ingresoId = updatedData.id_ingreso
  console.log("ingresoId: ",ingresoId) 
  const cargaId = updatedData.id_entrega_de_carga
  console.log("cargaId: ",cargaId)
  console.log("updatedData en put ingreso: ",updatedData)
  // router.get(`/entrega_cargasInfo/${(req.body.id_entrega_de_carga)}`, verifyUser, (err, result) => {
      con.query('SELECT e.id_entrega_de_carga, e.fecha, e.toneladas_entregadas, e.numero_de_entrega, e.id_empresa_silo, e.id_calidad_grano, e.id_parcela, e.id_zafra, e.vendido, s.nombre AS empresa_silo, g.descripcion AS calidad_grano, p.descripcion AS parcela, z.descripcion as zafra FROM entrega_de_cargas e INNER JOIN empresas_silos s ON e.id_empresa_silo = s.id_empresa_silo INNER JOIN calidades_granos g ON e.id_calidad_grano = g.id_calidad_grano INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE  id_entrega_de_carga = ? AND e.vendido= 0 AND e.estado= 1', [cargaId], (err, data) => {
      if (err) {
        console.error('Error al obtener datos de entrega_cargas:', err);
        return res.json({ Status: 'Error in Server' });
      }
      if (data.length > 0) {
          const dataEntregaCarga = data[0]//Se extrae los datos de la entrega de carga y apartir de ahí se actualiza con esos datos
          console.log("dataEntregaCarga.toneladas_entregadas: ",dataEntregaCarga.toneladas_entregadas)
          const total_ingreso = dataEntregaCarga.toneladas_entregadas * req.body.precio_venta
          const id_parcela = dataEntregaCarga.id_parcela
          const id_zafra = dataEntregaCarga.id_zafra
          console.log("total_ingreso: ",total_ingreso)
          console.log("id_parcela: ",id_parcela)
          console.log("id_zafra: ",id_zafra)
          //Con lo que me retorna en el data del select de parcelas, voy a usar data.toneladas entregadas (const cantidad = data.toneladaentregadas) para calcular el total ingreso a insetar en INSERT ingresos  
          
          con.query( `UPDATE ingresos SET precio_venta = ?, total_ingreso = ?, id_entrega_de_carga = ?, fecha = ?, id_parcela = ?, id_zafra = ? WHERE id_ingreso = ?`, [updatedData.precio_venta, total_ingreso, updatedData.id_entrega_de_carga, updatedData.fecha, updatedData.id_parcela, updatedData.id_zafra, ingresoId], (err, result) => {
            if (err) {
                console.log("err: ",err)
                return res.json({ Status: 'Error in Server' });
            }else{if(data){
              //En caso de actualizar el ingreso, setteamos a vendido=1 la entrega de carga
              const sql = `UPDATE entrega_de_cargas SET vendido = ? WHERE id_entrega_de_carga = ?`;
              const values = [1,cargaId]
              con.query(sql,values, (err, result) => {
                  if (err) {
                    console.error('Error al actualizar entrega de cargas a vendido:', err);
                    return res.json({ Status: 'Error in Server' });
                  }else if(result){
                    //Y setteamos a vendido=0 la entrega de carga anterior
                    const sql = `UPDATE entrega_de_cargas SET vendido = ? WHERE id_entrega_de_carga = ?`;
                    const values = [0,id_entrega_de_cargaAnterior]
                    con.query(sql,values, (err, result) => {
                        if (err) {
                          console.error('Error al actualizar entrega de cargas a vendido:', err);
                          return res.json({ Status: 'Error in Server' });
                        }else if(result){
                          console.log('Ingreso actualizado  correctamente:')
                          return res.json({ Status: 'Success' })
                        }
                    })
                  }
                })
            }
          }
        })
      } else {
          console.log("DATA.LENGTH < 0 ")
          return res.json({ Status: 'No data found' })
      }
      })
}



const ingresoDelete = async(req, res)=>{
  console.log("req.params: ",req.params)
  console.log("Ingresa a DELETE ingreso")  
  const ingresoId = req.params.id
  console.log("ingresoId: ",ingresoId)
  //Extraemos los datos de ingreso, ya que necesitamos el id_entrega_de_carga
  con.query('SELECT e.id_ingreso, e.precio_venta, e.total_ingreso, e.fecha, e.id_entrega_de_carga, e.id_parcela, e.id_zafra, c.numero_de_entrega AS entrega_de_carga, p.descripcion AS parcela, z.descripcion AS zafra FROM ingresos e INNER JOIN entrega_de_cargas c ON e.id_entrega_de_carga = c.id_entrega_de_carga INNER JOIN parcelas p ON e.id_parcela = p.id_parcela INNER JOIN zafras z ON e.id_zafra = z.id_zafra WHERE id_ingreso = ? AND e.estado= 1', [ingresoId], (err, dataIngreso) => {
    if (err) {
      console.error('Error al obtener datos de ingreso:', err);
      return res.json({ Status: 'Error in Server' });
    } 
    if (dataIngreso.length > 0) {
      console.log("dataIngreso en get EditProdParcela: ",dataIngreso)
      const id_entrega_de_carga = dataIngreso[0].id_entrega_de_carga

      const sql = `UPDATE entrega_de_cargas SET vendido = ? WHERE id_entrega_de_carga = ?`;
      const values = [0,id_entrega_de_carga]
      con.query(sql,values, (err, result) => {
          if (err) {
            console.error('Error al actualizar entrega de cargas a vendido:', err);
            return res.json({ Status: 'Error in Server' });
          }else if(result){

            const sql = `UPDATE ingresos SET estado = ? WHERE id_ingreso = ?`;
            const values = [0,ingresoId]
            con.query(sql,values, (err, result) => {
                if (err) {
                  console.error('Error al eliminar el ingreso:', err);
                  return res.json({ Status: 'Error in Server' });
                }else if(result){
                  return res.json({ Status: 'Success'});
                }
            })

          }
      })
    } else {
      return res.json({ Status: 'No dataIngreso found' });
    }
  })
}




export default {
    AddIngreso,
    ListarIngreso,
    ingresoEdit,
    ingreso,
    ingresoDelete
}