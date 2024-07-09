import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_entrega_cargas from './edit_entrega_cargas';
import { Link } from 'react-router-dom';
import './lista_entrega_cargas.css'
import { format, parseISO } from 'date-fns';
import EntregaCargasPDF from './EntregaCargasPDF';


const filterEntregaCargas = (data, filterType, searchText, filterDate) => {
  return data.filter((data) => {
    if (filterType === "zafra") {
      return data.zafra.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "parcela") {
      return data.parcela.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "empresa_silo") {
      return data.empresa_silo.toLowerCase().includes(searchText.toLowerCase());
    }    

    return true; // Fallback para otros casos
  });
};


function ListaEntregaCargas() {
  axios.defaults.withCredentials = true;
  
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("empresa_silo");
  const [filterDate, setFilterDate] = useState("");
  const [FilteredEntregaCargas, setFilteredEntregaCargas] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/entrega_cargas')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data.map(item => ({
            ...item,
            fecha: format(parseISO(item.fecha), 'yyyy-MM-dd'),
          })));
        } else {
          console.log('Error al obtener datos de entrega_cargas');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  


  console.log(data)
  const handleDeleteClick = (cargaId) => {
    console.log("Ingreso al handleDeleteClick de lista_entrega_cargas")
    axios.put(`http://localhost:8081/entrega_cargasDelete/${cargaId}`)
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {
            console.log("entrega_carga eliminada con exito")
            setData(data.filter((item) => item.id !== cargaId));
            window.location.reload();
        } else {
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar la carga:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (cargaId) => {
    axios.get(`http://localhost:8081/entrega_cargas/${cargaId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setEditingData(res.data.data); // Datos de la carga que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de carga para edición:', res.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error de red o del servidor:', err);
      });
  };

  const handleCancelEdit = () => {
    setShowEditForm(false); // Ocultar el formulario de edición
    setEditingData(null); // Limpiar los datos de edición
  };

  const handleSaveEdit = (editedData) => {
    // En este punto, `editedData` contiene los datos editados del formulario
    // Realiza una solicitud al servidor para actualizar los datos 
    axios.put(`http://localhost:8081/entrega_cargas/${editingData.id}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados
          setRefresh(refresh?0:1)
          setShowEditForm(false); // Ocultar el formulario de edición
          setEditingData(null); // Limpiar los datos de edición


          axios.post('http://localhost:8081/insertarAuditoria', ['EditEntregaCarga']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                  event.target.reset();
                  window.location.reload();
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));




        } else {
          console.error('Error al guardar los cambios:', res.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error de red o del servidor:', err);
      });
  };

  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterEntregaCargas(data, filterType, searchText, filterDate);
    setFilteredEntregaCargas(filteredData);
  }, [data, filterType, searchText, filterDate]);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSearchText("");
    setFilterDate("");
  };

  const handleFilterInputChange = (e) => {
    setSearchText(e.target.value);
    setFilterDate(e.target.value);
  };

  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
                  
              <div className="row pb-3">
                  <div className="col-md-6 w-50">
                    <select className="w-75 form-select" value={filterType} onChange={handleFilterTypeChange}>
                      <option value="zafra">Zafra</option>
                      <option value="parcela">Parcela</option>
                      <option value="empresa_silo">Empresa silo</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    {filterType === "zafra" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por zafra"
                      />
                    )}
                    {filterType === "parcela" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por parcela"
                      />
                    )}
                    {filterType === "empresa_silo" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por empresa silo"
                      />
                    )}
                  </div>
              </div>
              
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => EntregaCargasPDF(FilteredEntregaCargas)} //Crear archivo
                >
                  Generar reporte
                </button>
              </div>


              <div className='nav-lista'>
              <h2>Lista de Entrega de Cargas</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fecha:</th>
                      <th scope="col">Toneladas entregadas:</th>
                      <th scope="col">Número de entrega</th>
                      <th scope="col">Empresa silo</th>
                      <th scope="col">Calidad grano</th>
                      <th scope="col">Parcela</th>
                      <th scope="col">Zafra</th>
                      <th scope="col">Vendido</th>
                      <th scope="col">Editar</th> 
                      <th scope="col">Eliminar</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {FilteredEntregaCargas? FilteredEntregaCargas.map((item) => ( 
                      <tr key={item.id_entrega_de_carga}>
                        <th scope="row">{item.id_entrega_de_carga}</th> 
                        <td>{item.fecha}</td>
                        <td>{item.toneladas_entregadas}</td>
                        <td>{item.numero_de_entrega}</td>
                        <td>{item.empresa_silo}</td>
                        <td>{item.calidad_grano}</td>
                        <td>{item.parcela}</td>
                        <td>{item.zafra}</td>
                        <td>{item.vendido==0? 'No':'Si' }</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_entrega_de_carga)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_entrega_de_carga)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/entrega_cargas" className='btn btn-primary'>Agregar carga entregada</Link>
                {showEditForm && (
                <Edit_entrega_cargas
                  datosEdicion={editingData}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              )}
              </div>
            </div>
            </>
        </div>
    </>
  );
}

export default ListaEntregaCargas;
