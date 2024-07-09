import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; // Importa react-select

function AddIngreso() {
    axios.defaults.withCredentials = true;
  
    const [values, setValues] = useState({ //Para mis values del formulario
        precio_venta: '',
        total_ingreso: 0,
        id_entrega_de_carga: '', 
        fecha: '',
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [entrega_de_cargaData, setEntrega_de_cargaData] = useState([]); //Valores de entrega_de_carga en entrega_de_cargaData

    const [selectedEntrega_de_carga, setSelectedEntrega_de_carga] = useState(null); //Selección de Entrega_de_carga en el form se guarda acá

    useEffect(()=>{//entrega_cargas
        axios.get('http://localhost:8081/entrega_cargasParaIngreso')
        .then(res => {
            if(res.data.Status === 'Success') {
                setEntrega_de_cargaData(res.data.data);
            } else {
                console.log("error al traer los datos de entrega de cargas")
            }
        })
    }, [])


    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedEntrega_de_carga) {
            values.id_entrega_de_carga = selectedEntrega_de_carga.value; // Asumiendo que el valor de AddIngreso es la ID
        }
        axios.post('http://localhost:8081/AddIngreso', values) 
        .then(res => { 
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                console.log("AddIngreso correcto ",res.data.Status)


                axios.post('http://localhost:8081/insertarAuditoria', ['AddIngreso']) 
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
                if(res.data.Status === 'Vendido'){
                console.log("Entrega de cargas ya estaba vendida ",res.data.Status)
                event.target.reset();
                window.location.reload();
                }
                setError(res.data.Error); //Setea el error para mostrar
            }
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Añadir ingreso</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                    <label htmlFor="precio_venta"><strong>Precio venta</strong></label>
                                    <input type="text" placeholder='precio_venta' name='precio_venta' 
                                    onChange={e => setValues({...values, precio_venta: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="id_entrega_de_carga"><strong>Entrega de carga:</strong></label>
                                <Select
                                    options={(entrega_de_cargaData) ? entrega_de_cargaData.map((entrega_de_carga) => ({ //Mapea entrega_de_cargaData (les da otro nombre) y guarda en "options" 
                                        value: entrega_de_carga.id_entrega_de_carga,
                                        label: entrega_de_carga.fecha,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedEntrega_de_carga(selectedOption)}
                                    value={selectedEntrega_de_carga}
                                    placeholder='Selecciona una entrega de carga' 
                                    name='id_entrega_de_carga'
                                />
                            </div>
                            <div className='mb-3'>
                                    <label htmlFor="fecha"><strong>fecha</strong></label>
                                    <input type="date" placeholder='fecha' name='fecha' 
                                    onChange={e => setValues({...values, fecha: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
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
export default AddIngreso