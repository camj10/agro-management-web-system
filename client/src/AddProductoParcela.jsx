import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; 

function AddProductoParcela() {
    axios.defaults.withCredentials = true;
    
    const [values, setValues] = useState({ //Para mis values del formulario
        fecha: '',
        id_producto: '',
        cantidad: '',
        id_tipo_trabajo: '',
        id_parcela: '',
        id_zafra: '',
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [productoData, setproductoData] = useState([]); //Valores de producto en productoData
    const [tipo_trabajoData, setTipo_trabajoData] = useState([]); //Valores de tipo_trabajo en tipo_trabajo
    const [parcelaData, setParcelaData] = useState([]); //Valores de Parcela en Parcela
    const [zafraData, setZafraData] = useState([]); //Valores de zafra en zafra

    const [selectedProducto, setSelectedProducto] = useState(null); //Selección de producto en el form se guarda acá
    const [selectedTipo_trabajo, setSelectedTipo_trabajo] = useState(null); //Selección de Tipo_trabajo en el form se guarda acá
    const [selectedParcela, setSelectedParcela] = useState(null); //Selección de parcela en el form se guarda acá
    const [selectedZafra, setSelectedZafra] = useState(null); //Selección de Zafra en el form se guarda acá

    useEffect(()=>{//producto
        axios.get('http://localhost:8081/productos')
        .then(res => {
            if(res.data.Status === 'Success') {
                setproductoData(res.data.data);
            } else {
                setMessage(res.data.Error)
                console.log("error")
            }
        })
    }, [])

    useEffect(()=>{//marca
    axios.get('http://localhost:8081/listarTipo_Trabajo') //Falta agregar en el server y hacer el crud
    .then(res => {
        if(res.data.Status === 'Success') {
            setTipo_trabajoData(res.data.data);
        } else {
            setMessage(res.data.Error)
            console.log("error")
        }
    })
    }, [])

    useEffect(()=>{//parcelas
    axios.get('http://localhost:8081/Listarparcelas')
    .then(res => {
        if(res.data.Status === 'Success') {
            setParcelaData(res.data.data);
        } else {
            setMessage(res.data.Error)
            console.log("error")
        }
    })
    }, [])

    useEffect(()=>{//parcelas
        axios.get('http://localhost:8081/listarZafra')
        .then(res => {
            if(res.data.Status === 'Success') {
                setZafraData(res.data.data);
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
        if (selectedTipo_trabajo) {
            values.id_tipo_trabajo = selectedTipo_trabajo.value; // Asumiendo que el valor de tipo_trabajo es la ID
        }
        if (selectedParcela) {
            values.id_parcela = selectedParcela.value; // Asumiendo que el valor de parcela es la ID
        }
        if (selectedZafra) {
            values.id_zafra = selectedZafra.value; // Asumiendo que el valor de parcela es la ID
        }
        axios.post('http://localhost:8081/AddProductoParcela', values) 
        .then(res => { 
            if(res.data.Status === 'Success') { 
                console.log("ProductoParcela correcto ",res.data.Status)

                
                axios.post('http://localhost:8081/insertarAuditoria', ['AddProductoParcela']) 
                .then(res => { 
                    if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                        console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                        event.target.reset();
                        window.location.reload();
                    } else { //Y acá si salió mal
                        setError(res.data.Error); //Setea el error para mostrar
                    }
                }).catch(err => console.log(err));




            } else { 
                if(res.data.Status === 'Excede') { 
                    window.alert('La cantidad de producto excede lo almacenado en stock');
                }
                setError(res.data.Error); 
            }
        }).catch(err => console.log(err));
    }

    
    return (
        <>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Añadir producto en parcela</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                    <label htmlFor="fecha"><strong>fecha</strong></label>
                                    <input type="date" placeholder='fecha' name='fecha' 
                                    onChange={e => setValues({...values, fecha: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
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
                                    <input type="number" placeholder='cantidad' name='cantidad' 
                                    onChange={e => setValues({...values, cantidad: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="id_tipo_trabajo"><strong>tipo_trabajo:</strong></label>
                                <Select
                                    options={(tipo_trabajoData) ? tipo_trabajoData.map((tipo_trabajo) => ({ //Mapea tipo_trabajoData (les da otro nombre) y guarda en "options" 
                                        value: tipo_trabajo.id_tipo_trabajo,
                                        label: tipo_trabajo.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedTipo_trabajo(selectedOption)}
                                    value={selectedTipo_trabajo}
                                    placeholder='Selecciona un tipo de trabajo' 
                                    name='id_tipo_trabajo'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_parcela"><strong>Parcela:</strong></label>
                                <Select
                                    options={(parcelaData) ? parcelaData.map((parcela) => ({ //Mapea parcelaData (les da otro nombre) y guarda en "options" 
                                        value: parcela.id_parcela,
                                        label: parcela.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedParcela(selectedOption)}
                                    value={selectedParcela}
                                    placeholder='Selecciona una parcela' 
                                    name='id_parcela'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_zafra"><strong>Zafra:</strong></label>
                                <Select
                                    options={(zafraData) ? zafraData.map((zafra) => ({ //Mapea zafraData (les da otro nombre) y guarda en "options" 
                                        value: zafra.id_zafra,
                                        label: zafra.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedZafra(selectedOption)}
                                    value={selectedZafra}
                                    placeholder='Selecciona una zafra' 
                                    name='id_zafra'
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-success m-1">Guardar</button>
                            </div>
                            <br></br>
                        </form>
                    </div>
                </div>
                <div>
                    <Link to="/ListaProductosParcelas" className='btn btn-primary m-1'>Productos en parcela</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddProductoParcela