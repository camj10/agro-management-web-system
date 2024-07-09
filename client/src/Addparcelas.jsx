import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; 
import DrawPolygonMap from './DrawPolygonMap';

function Parcelas() {
    axios.defaults.withCredentials = true;
  
    const [values, setValues] = useState({ //Para mis values del formulario
        cantidad_hectareas: '',
        descripcion: '',
        id_pais: '',
        id_departamento: '',
        id_ciudad: '',
        id_barrio: '',
        coordenadas: '',
    })
    
    const navigate = useNavigate();
    const [error, setError] = useState('');
  
    const [parcelaData, setParcelaData] = useState([]);
    const [paisData, setPaisData] = useState([]);
    const [departamentoData, setDepartamentoData] = useState([]);
    const [ciudadData, setCiudadData] = useState([]);
    const [barrioData, setBarrioData] = useState([]);
  
    const [selectedPais, setSelectedPais] = useState(null);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedCiudad, setSelectedCiudad] = useState(null);
    const [selectedBarrio, setSelectedBarrio] = useState(null);

    const [des, setDes] = useState('');
    const [i, setI] = useState('');


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
        values.cantidad_hectareas= i
        values.descripcion= des
        console.log("values: ",values)
        axios.post('http://localhost:8081/AddParcela', values) //Para acá lo que voy a usar esos values guardados y setValues
        .then(res => { //Hace la peición al servidor por medio del /entrega_cargas en el server e inserta los datos si todo va bien
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                console.log("Producto añadido correctamente ",res.data.Status)


                axios.post('http://localhost:8081/insertarAuditoria', ['AddParcela']) 
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
console.log(values)

    return (
        <>
        <div className='d-flex justify-content-center align-items-center  vh-50 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Añadir parcela</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-2'>
                                    <label htmlFor="cantidad_hectareas"><strong>Cantidad hectáreas</strong></label>
                                    <input type="number" placeholder='cantidad_hectareas' name='cantidad_hectareas' 
                                    onChange={e => setI(e.target.value)} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div className='mb-2'>
                                    <label htmlFor="descripcion"><strong>Descripcion</strong></label>
                                    <input type="text" placeholder='Descripcion' name='descripcion' 
                                    onChange={(e) =>{
                                    setDes(e.target.value)} } className='form-control rounded-0' autoComplete='off' />
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
                                <strong>barrio:</strong>
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
                                <label htmlFor="coordenadas">
                                <strong>Coordenadas:</strong>
                                </label>
                                <input
                                type="text"
                                placeholder='Coordenadas'
                                name='coordenadas'
                                value={values.coordenadas || ''}
                                className='form-control rounded-0'
                                readOnly
                                />
                            </div>
                            <div>
                                <DrawPolygonMap updateCoordenadas={(coordenadas) => setValues({ ...values, coordenadas: coordenadas })} />
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
                    <Link to="/ListaParcelas" className='btn btn-primary m-1'>Parcelas</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default Parcelas