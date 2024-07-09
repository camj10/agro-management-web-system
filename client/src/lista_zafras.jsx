import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_Zafra from './edit_Zafra';
import { Link } from 'react-router-dom';

function ListaZafras() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { //Obtiene los datos usados para listar las zafras entregadas
    axios.get('http://localhost:8081/listarZafra')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error al obtener datos de zafras');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  const handleDeleteClick = (zafraId) => {
    axios.put(`http://localhost:8081/borrarZafra/${zafraId}`)
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {

          axios.post('http://localhost:8081/insertarAuditoria', ['DeleteZafra']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));


            console.log("zafra eliminado con exito")
            setData(data.filter((item) => item.id !== zafraId));
            window.location.reload();
        } else {
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar la zafra:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (zafraId) => {
    axios.get(`http://localhost:8081/EditZafra/${zafraId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setEditingData(res.data.data); // Datos de la zafra que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de zafra para edición:', res.data.Error);
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
    axios.put(`http://localhost:8081/EditZafra/${editingData.id}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados

          axios.post('http://localhost:8081/insertarAuditoria', ['EditZafra']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));


          setRefresh(refresh?0:1)
          setShowEditForm(false); // Ocultar el formulario de edición
          setEditingData(null); // Limpiar los datos de edición
          console.log('Datos actualizados correctamente');
        } else {
          console.error('Error al guardar los cambios:', res.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error de red o del servidor:', err);
      });
  };

  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
              <div className='nav-lista'>
              <h2>Zafras</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data? data.map((item) => ( 
                      <tr key={item.id_zafra}>
                        <th scope="row">{item.id_zafra}</th> 
                        <td>{item.descripcion}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_zafra)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_zafra)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddZafra" className='btn btn-primary'>Agregar zafra</Link>
                {showEditForm && (
                <Edit_Zafra
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

export default ListaZafras;