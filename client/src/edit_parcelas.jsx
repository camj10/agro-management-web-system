import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function Edit_parcela({ datosEdicion, onCancel, onSave }) {
axios.defaults.withCredentials = true;
const [error, setError] = useState('');
const [paisData, setPaisData] = useState([]);
const [departamentoData, setDepartamentoData] = useState([]);
const [ciudadData, setCiudadData] = useState([]);
const [barrioData, setBarrioData] = useState([]);

const [selectedPais, setSelectedPais] = useState(null);
const [selectedDepartamento, setSelectedDepartamento] = useState(null);
const [selectedCiudad, setSelectedCiudad] = useState(null);
const [selectedBarrio, setSelectedBarrio] = useState(null);

const [editedData, setEditedData] = useState({}); // Estado para los datos editados

useEffect(() => {       
    const fetchData = async () => {
      try {
        const [paisRes, departamentoRes, ciudadRes, barrioRes] = await Promise.all([
          axios.get('http://localhost:8081/listarPaises'),
          axios.get('http://localhost:8081/listarDepartamentos'),
          axios.get('http://localhost:8081/listarCiudades'),
          axios.get('http://localhost:8081/listarBarrios'),
        ]);

        setPaisData(paisRes.data.Status === 'Success' ? paisRes.data.data : []);
        setDepartamentoData(departamentoRes.data.Status === 'Success' ? departamentoRes.data.data : []);
        setCiudadData(ciudadRes.data.Status === 'Success' ? ciudadRes.data.data : []);
        setBarrioData(barrioRes.data.Status === 'Success' ? barrioRes.data.data : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (datosEdicion) {
      setEditedData(datosEdicion);
      setSelectedPais(datosEdicion.id_pais ? { value: datosEdicion.id_pais, label: datosEdicion.pais } : null);
      setSelectedDepartamento(datosEdicion.id_departamento ? { value: datosEdicion.id_departamento, label: datosEdicion.departamento } : null);
      setSelectedCiudad(datosEdicion.id_ciudad ? { value: datosEdicion.id_ciudad, label: datosEdicion.ciudad } : null);
      setSelectedBarrio(datosEdicion.id_barrio ? { value: datosEdicion.id_barrio, label: datosEdicion.barrio } : null);
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
    e.preventDefault();
    try {
      // Agregar lógica de actualización utilizando la función onSave
      //Tomar el valor de cantidad de datosEdicion y editedData, hacer la diferencia y ese valor asignar al onsave con el objeto de editedData
      await onSave(editedData);
      console.log('Datos actualizados correctamente:', datosEdicion);
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      // Manejar errores según sea necesario
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="cantidad_hectareas"><strong>cantidad_hectareas:</strong></label>
                <input type="text" placeholder='cantidad_hectareas' name='cantidad_hectareas' 
                value={editedData.cantidad_hectareas || ''} onChange={handleInputChange} className='form-control rounded-0' autoComplete='off'/>
        </div>
        <div className='mb-3'>
                <label htmlFor="descripcion"><strong>descripcion:</strong></label>
                <input type="text" placeholder='descripcion' name='descripcion'
                value={editedData.descripcion || ''} onChange={handleInputChange} className='form-control rounded-0' />
        </div>
        <div>
            <label htmlFor="id_pais"><strong>Pais:</strong></label>
            <Select
            options={(paisData) ? paisData.map((pais) => ({ //Mapea paisData (les da otro nombre) y guarda en "options" 
                value: pais.id_pais,
                label: pais.descripcion,
            })) : [] }
            value={selectedPais}
            onChange={(selectedOption) => {
              setSelectedPais(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_pais: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona un Pais' 
            />
        </div>
        <div>
            <label htmlFor="id_departamento"><strong>Departamento:</strong></label>
            <Select
            options={(departamentoData) ? departamentoData.map((departamento) => ({ //Mapea departamentoData (les da otro nombre) y guarda en "options" 
                value: departamento.id_departamento,
                label: departamento.descripcion,
            })) : [] }
            value={selectedDepartamento}
            onChange={(selectedOption) => {
              setSelectedDepartamento(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_departamento: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona una departamento' 
            />
        </div>
        <div>
            <label htmlFor="id_ciudad"><strong>Ciudad:</strong></label>
            <Select
            options={(ciudadData) ? ciudadData.map((ciudad) => ({ //Mapea ciudadData (les da otro nombre) y guarda en "options"
                value: ciudad.id_ciudad,
                label: ciudad.nombre,
            })) : [] }
            value={selectedCiudad}
            onChange={(selectedOption) => {
              setSelectedCiudad(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_ciudad: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona una ciudad' 
            />
        </div>
        <div>
            <label htmlFor="id_barrio"><strong>Barrio:</strong></label>
            <Select
            options={(barrioData) ? barrioData.map((barrio) => ({ //Mapea barrioData (les da otro nombre) y guarda en "options" 
                value: barrio.id_barrio,
                label: barrio.descripcion,
            })) : [] }
            value={selectedBarrio}
            onChange={(selectedOption) => {
              setSelectedBarrio(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_barrio: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona un barrio' 
            />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  </>
   )
}

export default Edit_parcela;