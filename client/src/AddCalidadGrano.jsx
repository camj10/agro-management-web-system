import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddCalidadGrano() {
    axios.defaults.withCredentials = true;


    const [values, setValues] = useState({ //Para mis values del formulario
        descripcion: '',
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/addCalidadGrano', values) 
        .then(res => {
            if(res.data.Status === 'Success') { 
                
                
                axios.post('http://localhost:8081/insertarAuditoria', ['AddCalidadGrano']) 
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
                console.log("Error AddCalidadGrano ", error)
            }
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center vh-60 loginPage'>
        
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h3>Calidades de granos</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                    <label htmlFor="Descripcion"><strong>Descripcion</strong></label>
                                    <input type="text" placeholder='Ingrese la descripción' name='descripcion'
                                    onChange={e => setValues({...values, descripcion: e.target.value})} className='form-control rounded-0' />
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
                    <Link to="/listarCalidadesGranos" className='btn btn-primary'>Listar calidades de granos</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default AddCalidadGrano