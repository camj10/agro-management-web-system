import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

function Edit_producto({ datosEdicion, onCancel, onSave }) {
axios.defaults.withCredentials = true;
const [error, setError] = useState('');
const [tipo_productoData, setTipo_productoData] = useState([]);
const [marcaData, setMarcaData] = useState([]);
const [empresa_proveedoraData, setEmpresa_proveedoraData] = useState([]);
const [unidad_medidaData, setUnidad_medidaData] = useState([]);
const [selectedTipo_producto, setSelectedTipo_producto] = useState(null);
const [selectedMarca, setSelectedMarca] = useState(null);
const [selectedEmpresa_proveedora, setSelectedEmpresa_proveedora] = useState(null);
const [selectedUnidad_medida, setSelectedUnidad_medida] = useState(null);
const [editedData, setEditedData] = useState({}); // Estado para los datos editados

useEffect(() => {
    const fetchData = async () => {
      try {
        const [tipoProductoRes, marcaRes, empresaRes, unidadMedidaRes] = await Promise.all([
          axios.get('http://localhost:8081/tiposProductos'),
          axios.get('http://localhost:8081/listarMarcas'),
          axios.get('http://localhost:8081/empresasProveedoras'),
          axios.get('http://localhost:8081/unidadesMedida'),
        ]);

        setTipo_productoData(tipoProductoRes.data.Status === 'Success' ? tipoProductoRes.data.data : []);
        setMarcaData(marcaRes.data.Status === 'Success' ? marcaRes.data.data : []);
        setEmpresa_proveedoraData(empresaRes.data.Status === 'Success' ? empresaRes.data.data : []);
        setUnidad_medidaData(unidadMedidaRes.data.Status === 'Success' ? unidadMedidaRes.data.data : []);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    if (datosEdicion) {
      setEditedData(datosEdicion);
      setSelectedTipo_producto(datosEdicion.id_tipo_producto ? { value: datosEdicion.id_tipo_producto, label: datosEdicion.tipo_producto } : null);
      setSelectedMarca(datosEdicion.id_marca ? { value: datosEdicion.id_marca, label: datosEdicion.marca } : null);
      setSelectedEmpresa_proveedora(datosEdicion.id_empresa_proveedora ? { value: datosEdicion.id_empresa_proveedora, label: datosEdicion.empresa_proveedora } : null);
      setSelectedUnidad_medida(datosEdicion.id_unidad_medida ? { value: datosEdicion.id_unidad_medida, label: datosEdicion.unidad_medida } : null);
    }
  }, [datosEdicion]);


  useEffect(() => {
    console.log('editedData:', editedData);
  }, [editedData]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedData);
};
  return (
    <>
    <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                <label htmlFor="descripcion"><strong>Descripcion:</strong></label>
                <input type="text" placeholder='descripcion' name='descripcion' 
                value={editedData.descripcion || ''} onChange={handleInputChange} className='form-control rounded-0' autoComplete='off'/>
        </div>
        <div>
            <label htmlFor="id_tipo_producto"><strong>Tipo:</strong></label>
            <Select
            options={(tipo_productoData) ? tipo_productoData.map((tipo_producto) => ({ //Mapea tipo_productoData (les da otro nombre) y guarda en "options" 
                value: tipo_producto.id_tipo_producto,
                label: tipo_producto.nombre,
            })) : [] }
            value={selectedTipo_producto}
            onChange={(selectedOption) => {
              setSelectedTipo_producto(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_tipo_producto: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona un tipo de producto' 
            />
        </div>
        <div className='mb-3'>
                <label htmlFor="principios_activos"><strong>Principios activos:</strong></label>
                <input type="text" placeholder='Principios activos' name='principios_activos'
                value={editedData.principios_activos || ''} onChange={handleInputChange} className='form-control rounded-0' />
        </div>
        <div className='mb-3'>
                <label htmlFor="dosis"><strong>Dosis:</strong></label>
                <input type="text" placeholder='Dosis' name='dosis'
                value={editedData.dosis || ''} onChange={handleInputChange} className='form-control rounded-0' />
        </div>
        <div>
            <label htmlFor="id_marca"><strong>Marca:</strong></label>
            <Select
            options={(marcaData) ? marcaData.map((marca) => ({ //Mapea marcaData (les da otro nombre) y guarda en "options" 
                value: marca.id_marca,
                label: marca.descripcion,
            })) : [] }
            value={selectedMarca}
            onChange={(selectedOption) => {
              setSelectedMarca(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_marca: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona una marca' 
            />
        </div>
        <div>
            <label htmlFor="id_empresa_proveedora"><strong>Empresa proveedora:</strong></label>
            <Select
            options={(empresa_proveedoraData) ? empresa_proveedoraData.map((empresa_proveedora) => ({ //Mapea empresa_proveedoraData (les da otro nombre) y guarda en "options"
                value: empresa_proveedora.id_empresa_proveedora,
                label: empresa_proveedora.nombre,
            })) : [] }
            value={selectedEmpresa_proveedora}
            onChange={(selectedOption) => {
              setSelectedEmpresa_proveedora(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_empresa_proveedora: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona una empresa proveedora' 
            />
        </div>
        <div className='mb-3'>
                <label htmlFor="cantidad"><strong>Cantidad:</strong></label>
                <input type="text" placeholder='cantidad' name='cantidad' 
                value={editedData.cantidad || ''} onChange={handleInputChange} className='form-control rounded-0' autoComplete='off'/>
        </div>
        <div>
            <label htmlFor="id_unidad_medida"><strong>Unidad de medida:</strong></label>
            <Select
            options={(unidad_medidaData) ? unidad_medidaData.map((unidad_medida) => ({ //Mapea unidad_medidaData (les da otro nombre) y guarda en "options" 
                value: unidad_medida.id_unidad_medida,
                label: unidad_medida.descripcion,
            })) : [] }
            value={selectedUnidad_medida}
            onChange={(selectedOption) => {
              setSelectedUnidad_medida(selectedOption);
              setEditedData((prevData) => ({
                ...prevData,
                id_unidad_medida: selectedOption ? selectedOption.value : null,
              }));
            }}
            placeholder='Selecciona una unidad de medida' 
            />
        </div>
        <div className='mb-3'>
                <label htmlFor="precio"><strong>Precio:</strong></label>
                <input type="text" placeholder='Principios activos' name='precio'
                value={editedData.precio || ''} onChange={handleInputChange} className='form-control rounded-0' />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  </>
   )
}

export default Edit_producto;