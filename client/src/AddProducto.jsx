import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; // Importa react-select

function AddProducto() {
    axios.defaults.withCredentials = true;
  
    const [values, setValues] = useState({ //Para mis values del formulario
        descripcion: '',
        id_tipo_producto: '',
        principios_activos: '',
        dosis: '',
        id_marca: '',
        id_empresa_proveedora: '',
        cantidad: '',
        id_unidad_medida: '',
        precio: '',
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [tipo_productoData, setTipo_productoData] = useState([]); //Valores de Tipo_producto en Tipo_productoData
    const [marcaData, setMarcaData] = useState([]); //Valores de Marca en Marca
    const [empresa_proveedoraData, setEmpresa_proveedoraData] = useState([]); //Valores de Empresa_proveedora en Empresa_proveedora
    const [unidad_medidaData, setUnidad_medidaData] = useState([]); //Valores de Unidad_medida en Unidad_medida

    const [selectedTipo_producto, setSelectedTipo_producto] = useState(null); //Selección de tipo_producto en el form se guarda acá
    const [selectedMarca, setSelectedMarca] = useState(null); //Selección de Marca en el form se guarda acá
    const [selectedEmpresa_proveedora, setSelectedEmpresa_proveedora] = useState(null); //Selección de empresas_silos en el form se guarda acá
    const [selectedUnidad_medida, setSelectedUnidad_medida] = useState(null); //Selección de unidad_medida en el form se guarda acá

    useEffect(()=>{//tipo_producto
        axios.get('http://localhost:8081/tiposProductos')
        .then(res => {
            if(res.data.Status === 'Success') {
                setTipo_productoData(res.data.data);
            } else {
                setMessage(res.data.Error)
                console.log("error")
            }
        })
    }, [])

    useEffect(()=>{//marca
    axios.get('http://localhost:8081/listarMarcas')
    .then(res => {
        if(res.data.Status === 'Success') {
            setMarcaData(res.data.data);
        } else {
            setMessage(res.data.Error)
            console.log("error")
        }
    })
    }, [])

    useEffect(()=>{//empresa_proveedora
    axios.get('http://localhost:8081/empresasProveedoras')
    .then(res => {
        if(res.data.Status === 'Success') {
            setEmpresa_proveedoraData(res.data.data);
        } else {
            setMessage(res.data.Error)
            console.log("error")
        }
    })
    }, [])

    useEffect(()=>{//Unidad_medida
        axios.get('http://localhost:8081/unidadesMedida')
        .then(res => {
            if(res.data.Status === 'Success') {
                setUnidad_medidaData(res.data.data);
            } else {
                setMessage(res.data.Error)
                console.log("error")
            }
        })
        }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedTipo_producto) {
            values.id_tipo_producto = selectedTipo_producto.value; // Asumiendo que el valor de tipo_producto es la ID
        }
        if (selectedMarca) {
            values.id_marca = selectedMarca.value; // Asumiendo que el valor de marca es la ID
        }
        if (selectedEmpresa_proveedora) {
            values.id_empresa_proveedora = selectedEmpresa_proveedora.value; // Asumiendo que el valor de empresa_proveedora es la ID
        }
        if (selectedUnidad_medida) {
            values.id_unidad_medida = selectedUnidad_medida.value; // Asumiendo que el valor de marca es la ID
        }
        axios.post('http://localhost:8081/AddProducto', values) //Para acá lo que voy a usar esos values guardados y setValues
        .then(res => { //Hace la peición al servidor por medio del /entrega_cargas en el server e inserta los datos si todo va bien
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                console.log("entrega_cargas correcto ",res.data.Status)

                axios.post('http://localhost:8081/insertarAuditoria', ['AddProducto']) 
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
        <div className='d-flex justify-content-center align-items-center vh-60 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h3>Añadir producto</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                    <label htmlFor="descripcion"><strong>Descripcion</strong></label>
                                    <input type="text" placeholder='Descripcion' name='descripcion' 
                                    onChange={e => setValues({...values, descripcion: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="id_tipo_producto"><strong>Tipo producto:</strong></label>
                                <Select
                                    options={(tipo_productoData) ? tipo_productoData.map((tipo_producto) => ({ //Mapea tipo_productoData (les da otro nombre) y guarda en "options" 
                                        value: tipo_producto.id_tipo_producto,
                                        label: tipo_producto.nombre,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedTipo_producto(selectedOption)}
                                    value={selectedTipo_producto}
                                    placeholder='Selecciona un tipo' 
                                    name='id_tipo_producto'
                                />
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="principios_activos"><strong>Principios activos</strong></label>
                                    <input type="text" placeholder='Enter principios_activos' name='principios_activos'
                                    onChange={e => setValues({...values, principios_activos: e.target.value})} className='form-control rounded-0' />
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="dosis"><strong>Dosis</strong></label>
                                    <input type="text" placeholder='Ingrese dosis' name='dosis'
                                    onChange={e => setValues({...values, dosis: e.target.value})} className='form-control rounded-0' />
                            </div>
                            <div>
                                <label htmlFor="id_marca"><strong>Marca:</strong></label>
                                <Select
                                    options={(marcaData) ? marcaData.map((marca) => ({ //Mapea marcaData (les da otro nombre) y guarda en "options" 
                                        value: marca.id_marca,
                                        label: marca.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedMarca(selectedOption)}
                                    value={selectedMarca}
                                    placeholder='Selecciona una marca' 
                                    name='id_marca'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_empresa_proveedora"><strong>Empresa proveedora:</strong></label>
                                <Select
                                    options={(empresa_proveedoraData) ? empresa_proveedoraData.map((empresa_proveedora) => ({ //Mapea empresa_proveedoraData (les da otro nombre) y guarda en "options" 
                                        value: empresa_proveedora.id_empresa_proveedora,
                                        label: empresa_proveedora.nombre,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedEmpresa_proveedora(selectedOption)}
                                    value={selectedEmpresa_proveedora}
                                    placeholder='Selecciona una empresa proveedora' 
                                    name='id_empresa_proveedora'
                                />
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="cantidad"><strong>Cantidad</strong></label>
                                    <input type="number" placeholder='cantidad' name='cantidad' 
                                    onChange={e => setValues({...values, cantidad: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="id_unidad_medida"><strong>Unidad de medida:</strong></label>
                                <Select
                                    options={(unidad_medidaData) ? unidad_medidaData.map((unidad_medida) => ({ //Mapea unidad_medidaData (les da otro nombre) y guarda en "options" 
                                        value: unidad_medida.id_unidad_medida,
                                        label: unidad_medida.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedUnidad_medida(selectedOption)}
                                    value={selectedUnidad_medida}
                                    placeholder='Selecciona una unidad de medida' 
                                    name='id_unidad_medida'
                                />
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="precio"><strong>Precio de compra</strong></label>
                                    <input type="number" placeholder='Precio' name='precio' 
                                    onChange={e => setValues({...values, precio: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <br></br>
                            <div>
                                <button type="submit" className="btn btn-success m-1">Guardar</button>
                            </div>
                            <br></br>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddProducto