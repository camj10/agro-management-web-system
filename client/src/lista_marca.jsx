import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_marca from './edit_marca';
import { Link } from 'react-router-dom';

function ListaMarcas() {
  axios.defaults.withCredentials = true;
  
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { //Obtiene los datos usados para listar Marcas entregadas
    axios.get('http://localhost:8081/listarMarcas')
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log(res.data.data)
          setData(res.data.data);
        } else {
          console.log('Error al obtener datos de Marcas');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  const handleDeleteClick = (marcaId) => {
    axios.put(`http://localhost:8081/borrarMarca/${marcaId}`)
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {
            console.log("marca eliminado con exito")
            setData(data.filter((item) => item.id !== marcaId));
 
            axios.post('http://localhost:8081/insertarAuditoria', ['DeleteMarca']) 
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
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar la marca:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (marcaId) => {
    axios.get(`http://localhost:8081/EditMarca/${marcaId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log("res.data.data:",res.data.data)
          setEditingData(res.data.data); // Datos de la marca que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de marca para edición:', res.data.Error);
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
    axios.put(`http://localhost:8081/EditMarca/${editingData.id}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados


          axios.post('http://localhost:8081/insertarAuditoria', ['EditMarca']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                  event.target.reset();
                  window.location.reload();
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
              <h2>Marca</h2>
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
                      <tr key={item.id_marca}>
                        <th scope="row">{item.id_marca}</th> 
                        <td>{item.descripcion}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_marca)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_marca)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddMarca" className='btn btn-primary'>Agregar marca</Link>
                {showEditForm && (
                <Edit_marca
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

export default ListaMarcas;