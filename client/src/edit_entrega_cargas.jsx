import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { format, parseISO } from 'date-fns';

function Edit_entrega_cargas({ datosEdicion, onCancel, onSave }) {
  axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    const [parcelaData, setParcelaData] = useState([]); //Valores de parcela en parcelaData
    const [calidad_granoData, setCalidad_granoData] = useState([]); //Valores de calidad_grano en calidad_grano
    const [empresa_siloData, setEmpresa_siloData] = useState([]); //Valores de empresa_silo en empresa_silo
    const [zafraData, setZafraData] = useState([]); //Valores de zafra en zafra

    const [selectedParcela, setSelectedParcela] = useState(null); //Selección de parcela en el form se guarda acá
    const [selectedCalidad_grano, setSelectedCalidad_grano] = useState(null); //Selección de calidad_grano en el form se guarda acá
    const [selectedEmpresa_silo, setSelectedEmpresa_silo] = useState(null); //Selección de empresa_silo en el form se guarda acá
    const [selectedZafra, setSelectedZafra] = useState(null); //Selección de Zafra en el form se guarda acá


    const [editedData, setEditedData] = useState({}); // Estado para los datos editados


    useEffect(()=>{//Parcelas
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
        }).catch(err => console.log(err), console.log("axios error in parcelas"));

    }, [])

    useEffect(()=>{//Calidad_grano
    axios.get('http://localhost:8081/calidades_granos')
    .then(res => {
        console.log("res.data.Status === ", res.data.Status)
        if(res.data.Status === 'Success') {
            setCalidad_granoData(res.data.data);
            console.log("res success in calidad_grano")
        } else {
            setMessage(res.data.Error)
            console.log("data error in calidad_grano")
        }
    }).catch(err => console.log(err), console.log("axios error in calidad_grano"));

    }, [])

    useEffect(()=>{//Empresa_silo
    axios.get('http://localhost:8081/empresas_silos')
    .then(res => {
        console.log("res.data.Status === ", res.data.Status)
        if(res.data.Status === 'Success') {
            setEmpresa_siloData(res.data.data);
            console.log("res success in empresa_silo")
        } else {
            setMessage(res.data.Error)
            console.log("data error in empresa_silo")
        }
    }).catch(err => console.log(err), console.log("axios error in empresa_silo"));

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

  useEffect(() => {
    if (datosEdicion) { 
        const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
        setEditedData({ ...datosEdicion, fecha: fechaFormateada });
        setSelectedParcela(datosEdicion.id_parcela ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela } : null);
        setSelectedCalidad_grano(datosEdicion.id_calidad_grano ? { value: datosEdicion.id_calidad_grano, label: datosEdicion.calidad_grano } : null);
        setSelectedEmpresa_silo(datosEdicion.id_empresa_silo ? { value: datosEdicion.id_empresa_proveedora, label: datosEdicion.empresa_silo } : null);
        setSelectedZafra(datosEdicion.id_zafra ? { value: datosEdicion.id_empresa_proveedora, label: datosEdicion.zafra } : null);
    }
  }, [datosEdicion]);
  useEffect(() => {
    console.log('editedData:', editedData);
  }, [editedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log("datosEdicion en edit-  handlesubmit: ",editedData)
    e.preventDefault();
    try {
      // Agregar lógica de actualización utilizando la función onSave
      await onSave(editedData);
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      // Manejar errores según sea necesario
    }
  };

 
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='fecha'>
            <strong>fecha:</strong>
          </label>
          <input
            type='date'
            placeholder='fecha'
            name='fecha'
            value={editedData.fecha || ''}
            onChange={handleInputChange}
            className='form-control rounded-0'
            autoComplete='off'
          />
        </div>
        <div className='mb-3'>
                <label htmlFor="toneladas_entregadas"><strong>Toneladas entregadas</strong></label>
                <input type="text" placeholder='toneladas_entregadas' name='toneladas_entregadas' 
                value={editedData.toneladas_entregadas || ''} onChange={handleInputChange} className='form-control rounded-0' autoComplete='off'/>
        </div>
        <div className='mb-3'>
                <label htmlFor="numero_de_entrega"><strong>Numero de entrega</strong></label>
                <input type="text" placeholder='Enter numero_de_entrega' name='numero_de_entrega'
                value={editedData.numero_de_entrega || ''} onChange={handleInputChange} className='form-control rounded-0' />
        </div>
        <div>
            <label htmlFor="id_empresa_silo"><strong>Empresa silo:</strong></label>
            <Select
            options={(empresa_siloData) ? empresa_siloData.map((empresa_silo) => ({ //Mapea empresa_siloData (les da otro nombre) y guarda en "options" 
                value: empresa_silo.id_empresa_silo,
                label: empresa_silo.nombre,
            })) : [] }
            value={selectedEmpresa_silo}
            onChange={(selectedOption) => {
                setSelectedEmpresa_silo(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_empresa_silo: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Select a empresa_silo' 
            />
        </div>
        <div>
            <label htmlFor="id_calidad_grano"><strong>Calidad de grano:</strong></label>
            <Select
            options={(calidad_granoData) ? calidad_granoData.map((calidad_grano) => ({ //Mapea calidad_granoData (les da otro nombre) y guarda en "options" 
                value: calidad_grano.id_calidad_grano,
                label: calidad_grano.descripcion,
            })) : [] }
            value={selectedCalidad_grano}
            onChange={(selectedOption) => {
                setSelectedCalidad_grano(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_calidad_grano: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Select a calidad_grano' 
            />
        </div>
        <div>
            <label htmlFor="id_parcela"><strong>Parcela:</strong></label>
            <Select
            options={(parcelaData) ? parcelaData.map((parcela) => ({ //Mapea parcelaData (les da otro nombre) y guarda en "options"
                value: parcela.id_parcela,
                label: parcela.descripcion,
            })) : [] }
            value={selectedParcela}
            onChange={(selectedOption) => {
                setSelectedParcela(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_parcela: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Select a parcela' 
            />
        </div>
        <div>
            <label htmlFor="id_zafra"><strong>Zafra:</strong></label>
            <Select
                options={(zafraData) ? zafraData.map((zafra) => ({ //Mapea zafraData (les da otro nombre) y guarda en "options" 
                    value: zafra.id_zafra,
                    label: zafra.descripcion,
                })) : [] }
                value={selectedZafra}
                onChange={(selectedOption) => {
                    setSelectedZafra(selectedOption);
                    setEditedData((prevData) => ({
                    ...prevData,
                    id_zafra: selectedOption ? selectedOption.value : null,
                    }));
                }}
                placeholder='Selecciona una zafra' 
            />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  </>
   )
}

export default Edit_entrega_cargas;
