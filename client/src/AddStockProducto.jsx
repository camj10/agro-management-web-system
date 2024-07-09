import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; // Importa react-select

function AddStockProducto() {
    axios.defaults.withCredentials = true;
  
    const [values, setValues] = useState({ //Para mis values del formulario
        id_producto: '',
        cantidad: '',
    })
    const [error, setError] = useState('')
    const [productoData, setProductoData] = useState([]); //Valores de producto en productoData}
    const [selectedProducto, setSelectedProducto] = useState(null); //Selección de producto en el form se guarda acá

    useEffect(()=>{//producto
        axios.get('http://localhost:8081/productos')
        .then(res => {
            if(res.data.Status === 'Success') {
                setProductoData(res.data.data);
            } else {
                setMessage(res.data.Error)
                console.log("error")
            }
        })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedProducto) {
            values.id_producto = selectedProducto.value; // Asumiendo que el valor de producto es la ID
        }
        axios.post('http://localhost:8081/AddStockProducto', values) //Para acá lo que voy a usar esos values guardados y setValues
        .then(res => { //Hace la peición al servidor por medio del /entrega_cargas en el server e inserta los datos si todo va bien
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                console.log("AddStockProducto correcto ",res.data.Status)

                

                axios.post('http://localhost:8081/insertarAuditoria', ['AddStockProducto']) 
                .then(res => { 
                    if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                        console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                        event.target.reset();
                        window.location.reload();
                    } else { //Y acá si salió mal
                        setError(res.data.Error); //Setea el error para mostrar
                    }
                }).catch(err => console.log(err));


            } else { //Y acá si salió mal
                setError(res.data.Error); //Setea el error para mostrar
            }
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Añadir stock de producto</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id_producto"><strong>Producto:</strong></label>
                                <Select
                                    options={(productoData) ? productoData.map((producto) => ({ //Mapea productoData (les da otro nombre) y guarda en "options" 
                                        value: producto.id_producto,
                                        label: producto.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedProducto(selectedOption)}
                                    value={selectedProducto}
                                    placeholder='Selecciona un producto' 
                                    name='id_producto'
                                />
                            </div>
                            <div className='mb-3'>
                                    <label htmlFor="cantidad"><strong>Cantidad</strong></label>
                                    <input type="text" placeholder='cantidad' name='cantidad' 
                                    onChange={e => setValues({...values, cantidad: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <br></br>
                            <div>
                                <button type="submit" className="btn btn-success m-1">Guardar</button>
                            </div>
                            <br></br>
                        </form>
                    </div>
                </div>
                <div>
                    <Link to="/ListaProductos" className='btn btn-primary m-1'>Productos</Link>
                    <Link to="/AddProducto" className='btn btn-primary m-1'>Añadir producto</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddStockProducto