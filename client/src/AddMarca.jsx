import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Marcas() {
    axios.defaults.withCredentials = true;

    const [values, setValues] = useState({ //Para mis values del formulario
        descripcion: '',
    })
    
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/addMarca', values) //Para acá lo que voy a usar esos values guardados y setValues
        .then(res => { //Hace la peición al servidor por medio del /Marcas en el server e inserta los datos si todo va bien
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien


                axios.post('http://localhost:8081/insertarAuditoria', ['AddMarca']) 
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
                console.log("Error Marcas ", error)
            }
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Marcas</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                    <label htmlFor="descripcion"><strong>descripcion</strong></label>
                                    <input type="text" placeholder='Enter direccion' name='direccion'
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
                    <Link to="/lista_marca" className='btn btn-primary'>Ver marcas</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default Marcas