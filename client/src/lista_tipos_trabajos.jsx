import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_Tipo_Trabajo from './edit_Tipo_Trabajo';
import { Link } from 'react-router-dom';

function ListaTiposTrabajos() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { //Obtiene los datos usados para listar las tipos_trabajos entregadas
    axios.get('http://localhost:8081/listarTipo_Trabajo')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error al obtener datos de tipos_trabajos');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  const handleDeleteClick = (tipo_trabajoId) => {
    axios.put(`http://localhost:8081/borrarTipo_Trabajo/${tipo_trabajoId}`)
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {

          axios.post('http://localhost:8081/insertarAuditoria', ['DeleteTipoTrabajo']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));


            console.log("tipo_trabajo eliminado con exito")
            setData(data.filter((item) => item.id !== tipo_trabajoId));
            window.location.reload();
        } else {
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar la tipo_trabajo:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (tipo_trabajoId) => {
    axios.get(`http://localhost:8081/EditTipo_Trabajo/${tipo_trabajoId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setEditingData(res.data.data); // Datos de la tipo_trabajo que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de tipo_trabajo para edición:', res.data.Error);
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
    axios.put(`http://localhost:8081/EditTipo_Trabajo/${editingData.id}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados

          axios.post('http://localhost:8081/insertarAuditoria', ['EditTipoTrabajo']) 
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
  // const menuStyle = {
  //   backgroundColor: 'Limegreen', // Puedes cambiar el color según tus preferencias
  //   padding: '10px', // Agrega algún espaciado si es necesario
  //   width: '100%'
  // };

  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
              <div className='nav-lista'>
              <h2>Tipos de trabajos</h2>
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
                      <tr key={item.id_tipo_trabajo}>
                        <th scope="row">{item.id_tipo_trabajo}</th> 
                        <td>{item.descripcion}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_tipo_trabajo)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_tipo_trabajo)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddTipoTrabajo" className='btn btn-primary'>Agregar tipo de trabajo</Link>
                {showEditForm && (
                <Edit_Tipo_Trabajo
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

export default ListaTiposTrabajos;
