import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; 

function AddEmpresaProveedora() {
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({ 
        nombre: '',
        telefono: '',
        email: '',
        id_pais: '',
        id_departamento: '',
        id_ciudad: '',
        id_barrio: '',
        direccion: ''
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [paisData, setPaisData] = useState([]);
    const [departamentoData, setDepartamentoData] = useState([]);
    const [ciudadData, setCiudadData] = useState([]);
    const [barrioData, setBarrioData] = useState([]);
  
    const [selectedPais, setSelectedPais] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedCiudad, setSelectedCiudad] = useState(null);
    const [selectedBarrio, setSelectedBarrio] = useState(null);

    useEffect(() => {
        // Cargar lista de países
        axios.get('http://localhost:8081/listarPaises')
          .then(res => {
            if (res.data.Status === 'Success') {
              setPaisData(res.data.data);
            } else {
              setMessage(res.data.Error);
            }
          });
      }, []);
    
      useEffect(() => {
        // Cargar lista de departamentos
        axios.get('http://localhost:8081/listarDepartamentos')
          .then(res => {
            if (res.data.Status === 'Success') {
              setDepartamentoData(res.data.data);
            } else {
              setMessage(res.data.Error);
            }
          });
      }, []);
    
      useEffect(() => {
        // Cargar lista de ciudades
        axios.get('http://localhost:8081/listarCiudades')
          .then(res => {
            if (res.data.Status === 'Success') {
              setCiudadData(res.data.data);
            } else {
              setMessage(res.data.Error);
            }
          });
      }, []);
    
      useEffect(() => {
        // Cargar lista de barrios
        axios.get('http://localhost:8081/listarBarrios')
          .then(res => {
            if (res.data.Status === 'Success') {
              setBarrioData(res.data.data);
            } else {
              setMessage(res.data.Error);
            }
          });
      }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedPais) {
            values.id_pais = selectedPais.value;
          }
        if (selectedDepartamento) {
          values.id_departamento = selectedDepartamento.value;
        }
        if (selectedCiudad) {
          values.id_ciudad = selectedCiudad.value;
        }
        if (selectedBarrio) {
          values.id_barrio = selectedBarrio.value;
        }

        axios.post('http://localhost:8081/AddEmpresaProveedora', values) 
        .then(res => { 
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                console.log("empresa proveedora correctamente añadida ",res.data.Status)
                
                axios.post('http://localhost:8081/insertarAuditoria', ['AddEmpresaProveedora']) 
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
        <div className='d-flex justify-content-center align-items-center vh-50 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h3>Empresa proveedora</h3>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                    <label htmlFor="nombre"><strong>Nombre</strong></label>
                                    <input type="text" placeholder='nombre' name='nombre' 
                                    onChange={e => setValues({...values, nombre: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="telefono"><strong>Teléfono</strong></label>
                                    <input type="text" placeholder='telefono' name='telefono' 
                                    onChange={e => setValues({...values, telefono: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="email"><strong>Email</strong></label>
                                    <input type="email" placeholder='email' name='email' 
                                    onChange={e => setValues({...values, email: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="id_pais">
                                <strong>Pais:</strong>
                                </label>
                                <Select
                                options={(paisData) ? paisData.map((pais) => ({
                                    value: pais.id_pais,
                                    label: pais.descripcion,
                                })) : []}
                                onChange={(selectedOption) => setSelectedPais(selectedOption)}
                                value={selectedPais}
                                placeholder='Selecciona un pais'
                                name='id_pais'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_departamento">
                                <strong>Departamento:</strong>
                                </label>
                                <Select
                                options={(departamentoData) ? departamentoData.map((departamento) => ({
                                    value: departamento.id_departamento,
                                    label: departamento.descripcion,
                                })) : []}
                                onChange={(selectedOption) => setSelectedDepartamento(selectedOption)}
                                value={selectedDepartamento}
                                placeholder='Selecciona un departamento'
                                name='id_departamento'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_ciudad">
                                <strong>Ciudad:</strong>
                                </label>
                                <Select
                                options={(ciudadData) ? ciudadData.map((ciudad) => ({
                                    value: ciudad.id_ciudad,
                                    label: ciudad.descripcion,
                                })) : []}
                                onChange={(selectedOption) => setSelectedCiudad(selectedOption)}
                                value={selectedCiudad}
                                placeholder='Selecciona una ciudad'
                                name='id_ciudad'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_barrio">
                                <strong>Barrio:</strong>
                                </label>
                                <Select
                                options={(barrioData) ? barrioData.map((barrio) => ({
                                    value: barrio.id_barrio,
                                    label: barrio.descripcion,
                                })) : []}
                                onChange={(selectedOption) => setSelectedBarrio(selectedOption)}
                                value={selectedBarrio}
                                placeholder='Selecciona un barrio'
                                name='id_barrio'
                                />
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="direccion"><strong>Direccion</strong></label>
                                    <input type="text" placeholder='direccion' name='direccion' 
                                    onChange={e => setValues({...values, direccion: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
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
export default AddEmpresaProveedora