import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'; // Importa react-select

function EntregaCargas() {
    axios.defaults.withCredentials = true;

    const [values, setValues] = useState({ //Para mis values del formulario
        fecha: '',
        toneladas_entregadas: '',
        numero_de_entrega: '',
        id_empresa_silo: '',
        id_calidad_grano: '',
        id_parcela: ''
    })
    
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const [parcelaData, setParcelaData] = useState([]); //Valores de parcela en parcelaData
    const [calidades_granosData, setCalidades_granosData] = useState([]); //Valores de calidades_granos en calidades_granos
    const [empresas_silosData, setEmpresas_silosData] = useState([]); //Valores de empresas_silos en empresas_silos
    const [zafraData, setZafraData] = useState([]); //Valores de zafra en zafra

    const [selectedParcela, setSelectedParcela] = useState(null); //Selección de parcela en el form se guarda acá
    const [selectedCalidades_granos, setSelectedCalidades_granos] = useState(null); //Selección de calidades_granos en el form se guarda acá
    const [selectedEmpresas_silos, setSelectedEmpresas_silos] = useState(null); //Selección de empresas_silos en el form se guarda acá
    const [selectedZafra, setSelectedZafra] = useState(null); //Selección de Zafra en el form se guarda acá

    useEffect(()=>{//Parcelas
        console.log("Client EntregaCargas: UseEffect parcelas")
        axios.get('http://localhost:8081/parcelas')
        .then(res => {
        console.log("res.data.Status === ", res.data.Status)
            if(res.data.Status === 'Success') {
                setParcelaData(res.data.data);
                console.log("res success in parcelas. datos traidos: ",res.data)
            } else {
                setMessage(res.data.Error)
                console.log("data error in parcelas")
            }
        })
        //.catch(err => console.log(err), console.log("axios error in parcelas"));

    }, [])

    useEffect(()=>{//Calidad_granos
    axios.get('http://localhost:8081/calidades_granos')
    .then(res => {
        console.log("res.data.Status === ", res.data.Status)
        if(res.data.Status === 'Success') {
            setCalidades_granosData(res.data.data);
            console.log("res success in calidades_granos")
        } else {
            setMessage(res.data.Error)
            console.log("data error in calidades_granos")
        }
    })
    //.catch(err => console.log(err), console.log("axios error in calidades_granos"));

    }, [])

    useEffect(()=>{//Empresas_silos
    axios.get('http://localhost:8081/empresas_silos')
    .then(res => {
        console.log("res.data.Status === ", res.data.Status)
        if(res.data.Status === 'Success') {
            setEmpresas_silosData(res.data.data);
            console.log("res success in empresas_silos")
        } else {
            setMessage(res.data.Error)
            console.log("data error in empresas_silos")
        }
    })
    //.catch(err => console.log(err), console.log("axios error in empresas_silos"));

    }, [])

    useEffect(()=>{//zafras
        console.log("Ingresa a listarZarra")
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
        console.log("Ingreso al handleSubmit del entrega_cargas")
        event.preventDefault();
        if (selectedParcela) {
            values.id_parcela = selectedParcela.value; // Asumiendo que el valor de parcela es la ID
        }
        if (selectedCalidades_granos) {
            values.id_calidad_grano = selectedCalidades_granos.value; // Asumiendo que el valor de parcela es la ID
        }
        if (selectedEmpresas_silos) {
            values.id_empresa_silo = selectedEmpresas_silos.value; // Asumiendo que el valor de parcela es la ID
        }
        if (selectedZafra) {
            values.id_zafra = selectedZafra.value; // Asumiendo que el valor de parcela es la ID
        }
        console.log("hola"
        )
        axios.post('http://localhost:8081/entrega_cargas', values) //Para acá lo que voy a usar esos values guardados y setValues
        .then(res => { //Hace la petición al servidor por medio del /entrega_cargas en el server e inserta los datos si todo va bien00
            if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                const id_empresa_silo = [values.id_empresa_silo]
                const cantidadNueva = [values.toneladas_entregadas]
                console.log("values: ",values)
                axios.get(`http://localhost:8081/VerStockSiloPorEmpresa/${id_empresa_silo}`) //Para acá lo que voy a usar esos values guardados y setValues
                .then(res => { //Hace la petición al servidor para ver si hay algún registro 
                    if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                        if(res.data.data){//Si existe la empresa en la base de datos de stock, entonces...
                            const dataEmpresa = res.data.data;
                            const id_stock_silo = dataEmpresa.id_stock_silo
                            const cantidadASumar = Number(dataEmpresa.cantidad) + Number(cantidadNueva)
                            //Entonces quiero enviar al server "cantidadASumar", ya que tiene la suma de lo que ya tenía + lo nuevo entregado
                            // Verifica si dataEmpresa es un objeto con propiedades
                            const newDataEmpresa = dataEmpresa
                              ? [{ cantidadASumar: cantidadASumar  }]
                              : [];
                            axios.put(`http://localhost:8081/AddCantidadStockSilo/${id_stock_silo}`, newDataEmpresa)
                            .then(res => { //Hace la petición al servidor para insertar la cantidad por medio del UPDATE
                                if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                                    console.log("AddCantidadStockSilo correcto res.data: ",res.data)
                                } else { //Y acá si salió mal
                                    setError(res.data.Error); //Setea el error para mostrar
                                    console.log("Error AddCantidadStockSilo ", error)
                                }
                            }).catch(err => console.log(err));
                        }else{//Si no existe la empresa en la base de datos de stock, entonces creo nuevo registro
                            const newStockSiloData = values
                              ? [{ id_empresa_silo: id_empresa_silo, cantidad: Number(cantidadNueva)   }]
                              : [];
                              console.log("newStockSiloData: ",newStockSiloData)
                            axios.post(`http://localhost:8081/AddStockSilo`, newStockSiloData)
                            .then(res => { //Hace la peición al servidor por medio del /entrega_cargas
                                if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                                    console.log("AddStockSilo correcto res.data: ",res.data)
                                } else { //Y acá si salió mal
                                    setError(res.data.Error); //Setea el error para mostrar
                                    console.log("Error AddStockSilo ", error)
                                }
                            }).catch(err => console.log(err));
                        }
                        AddStockSilo
                        event.target.reset();
                        //window.location.reload();
                    } else { //Y acá si salió malror para mostrar
                        console.log("Error id_empresa_silo ")
                    }
                }).catch(err => console.log(err));
                event.target.reset();
                //window.location.reload();
            } else { //Y acá si salió mal
                setError(res.data.Error); //Setea el error para mostrar
                console.log("Error entrega_cargas ", error)
            }
        }).catch(err => console.log(err));
    }

    return (
        <>
        <div className='d-flex justify-content-center align-items-center  vh-60 loginPage'>
            <div className='p-3 rounded w-25 border loginForm row align-items-start'>
                <div>
                    <h2>Entrega de carga</h2>
                    <div>
                        <form onSubmit={handleSubmit}>
                            
                            <div className='mb-3'>
                                    <label htmlFor="fecha"><strong>fecha</strong></label>
                                    <input type="date" placeholder='fecha' name='fecha' 
                                    onChange={e => setValues({...values, fecha: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div className='mb-3'>
                                    <label htmlFor="toneladas_entregadas"><strong>Toneladas entregadas</strong></label>
                                    <input type="text" placeholder='toneladas_entregadas' name='toneladas_entregadas' 
                                    onChange={e => setValues({...values, toneladas_entregadas: e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                            </div>
                            <div className='mb-3'>
                                    <label htmlFor="numero_de_entrega"><strong>Numero de entrega</strong></label>
                                    <input type="text" placeholder='Enter numero_de_entrega' name='numero_de_entrega'
                                    onChange={e => setValues({...values, numero_de_entrega: e.target.value})} className='form-control rounded-0' />
                            </div>
                            <div>
                                <label htmlFor="id_empresa_silo"><strong>Empresa silo:</strong></label>
                                <Select
                                    options={(empresas_silosData) ? empresas_silosData.map((empresa_silo) => ({ //Mapea empresas_silosData (les da otro nombre) y guarda en "options" 
                                        value: empresa_silo.id_empresa_silo,
                                        label: empresa_silo.nombre,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedEmpresas_silos(selectedOption)}
                                    value={selectedEmpresas_silos}
                                    placeholder='Select a empresa_silo' 
                                    name='id_empresa_silo'
                                />
                            </div>
                            <div>
                                <label htmlFor="id_calidad_grano"><strong>Calidad de grano:</strong></label>
                                <Select
                                    options={(calidades_granosData) ? calidades_granosData.map((calidad_grano) => ({ //Mapea calidades_granosData (les da otro nombre) y guarda en "options" 
                                        value: calidad_grano.id_calidad_grano,
                                        label: calidad_grano.descripcion,
                                    })) : [] }
                                    onChange={(selectedOption) => setSelectedCalidades_granos(selectedOption)}
                                    value={selectedCalidades_granos}
                                    placeholder='Select a calidad_grano' 
                                    name='id_calidad_grano'
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
                                    placeholder='Select a parcela' 
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
                                    placeholder='Selecciona una empresa zafra' 
                                    name='id_zafra'
                                />
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
                    <Link to="/lista_entrega_cargas" className='btn btn-primary m-1'>Cargas entregadas</Link>
                </div>
            </div>
        </div>
        </>
    )
}
export default EntregaCargas