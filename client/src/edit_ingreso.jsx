import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { format, parseISO } from 'date-fns'; 

function Edit_ingreso({ datosEdicion, onCancel, onSave }) {
  axios.defaults.withCredentials = true;

  const [error, setError] = useState('');
  const [entrega_de_cargaData, setEntrega_de_cargaData] = useState([]);
  const [parcelaData, setParcelaData] = useState([]);
  const [zafraData, setZafraData] = useState([]);

  const [selectedEntrega_de_carga, setSelectedEntrega_de_carga] = useState(null);
  const [selectedParcela, setSelectedParcela] = useState(null);
  const [selectedZafra, setSelectedZafra] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entrega_de_cargaRes, parcelaRes, zafraRes] = await Promise.all([
          axios.get('http://localhost:8081/entrega_cargasParaIngreso'),
          axios.get('http://localhost:8081/parcelas'),
          axios.get('http://localhost:8081/listarZafra'),
        ]);

        setEntrega_de_cargaData(entrega_de_cargaRes.data.Status === 'Success' ? entrega_de_cargaRes.data.data : []);
        setParcelaData(parcelaRes.data.Status === 'Success' ? parcelaRes.data.data : []);
        setZafraData(zafraRes.data.Status === 'Success' ? zafraRes.data.data : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (datosEdicion) {
      const fechaFormateada = datosEdicion.fecha ? format(parseISO(datosEdicion.fecha), 'yyyy-MM-dd') : '';
      setEditedData({ ...datosEdicion, fecha: fechaFormateada, id_entrega_de_cargaAnterior: datosEdicion.id_entrega_de_carga });

      // Asignar valores seleccionados de los dropdowns
      setSelectedEntrega_de_carga(
        datosEdicion.id_entrega_de_carga
          ? { value: datosEdicion.id_entrega_de_carga, label: datosEdicion.entrega_de_carga }
          : null
      );
      setSelectedParcela(
        datosEdicion.id_parcela
          ? { value: datosEdicion.id_parcela, label: datosEdicion.parcela }
          : null
      );
      setSelectedZafra(
        datosEdicion.id_zafra
          ? { value: datosEdicion.id_zafra, label: datosEdicion.zafra }
          : null
      );
    }
  }, [datosEdicion]);

  console.log("editedData.fecha: ",editedData.fecha)

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
      await onSave(editedData);
      console.log('Datos actualizados correctamente:', datosEdicion);
    } catch (error) {
      console.error('Error al actualizar datos:', error);
      // Manejar errores según sea necesario
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='precio_venta'>
            <strong>precio_venta:</strong>
          </label>
          <input
            type='number'
            placeholder='precio_venta'
            name='precio_venta'
            value={editedData.precio_venta || ''}
            onChange={handleInputChange}
            className='form-control rounded-0'
            autoComplete='off'
          />
        </div>
        <div>
          <label htmlFor='id_entrega_de_carga'>
            <strong>Entrega de cargas:</strong>
          </label>
          <Select
            options={(entrega_de_cargaData || []).map((entrega_de_carga) => ({
              value: entrega_de_carga.id_entrega_de_carga,
              label: entrega_de_carga.numero_de_entrega,
            }))}
            value={selectedEntrega_de_carga}
            onChange={(selectedOption) => {
                setSelectedEntrega_de_carga(selectedOption);
                setEditedData((prevData) => ({
                ...prevData,
                id_entrega_de_carga: selectedOption ? selectedOption.value : null,
                }));
            }}
            placeholder='Selecciona una carga'
          />
        </div>
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
        <button type='submit'>Guardar</button>
        <button type='button' onClick={onCancel}>
          Cancelar
        </button>
      </form>
    </>
  );
}

export default Edit_ingreso;
