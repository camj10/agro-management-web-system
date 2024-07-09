import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_marca from './edit_marca';
import { Link } from 'react-router-dom';

function ListaCalidadesGranos() {
  axios.defaults.withCredentials = true;
  
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { //Obtiene los datos usados para listar las marcas entregadas
    axios.get('http://localhost:8081/listarCalidadesGranos')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error al obtener datos de calidades grano');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  console.log(data)
  // const handleDeleteClick = (marcaId) => {
  //   axios.delete(`http://localhost:8081/borrarMarca/${marcaId}`)
  //     .then((res) => {
  //       // Verificar si la eliminación fue exitosa
  //       if (res.data.Status === 'Success') {
  //           console.log("marca eliminada con exito")
  //           setData(data.filter((item) => item.id !== marcaId));
  //           window.location.reload();
  //       } else {
  //         // Manejar cualquier error que el servidor haya devuelto
  //         console.error('Error al eliminar la marca:', res.data.Error);
  //       }
  //     })
  //     .catch((err) => {
  //       // Manejar errores de red o del servidor
  //       console.error('Error de red o del servidor:', err);
  //     });
  // };
  // const handleEditClick = (marcaId) => {
  //   axios.put(`http://localhost:8081/EditMarca/${marcaId}`)
  //     .then((res) => {
  //       if (res.data.Status === 'Success') {
  //         setEditingData(res.data.data); // Datos de la marca que deseas editar
  //         setShowEditForm(true); // Mostrar el formulario de edición
  //       } else {
  //         console.error('Error al obtener datos de marca para edición:', res.data.Error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Error de red o del servidor:', err);
  //     });
  // };

  // const handleCancelEdit = () => {
  //   setShowEditForm(false); // Ocultar el formulario de edición
  //   setEditingData(null); // Limpiar los datos de edición
  // };

  // const handleSaveEdit = (editedData) => {
  //   // En este punto, `editedData` contiene los datos editados del formulario
  //   // Realiza una solicitud al servidor para actualizar los datos
  //   console.log('first')
  //   axios.put(`http://localhost:8081/marcas/${editingData.id}`, editedData)
  //     .then((res) => {
  //       if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados
  //         setRefresh(refresh?0:1)
  //         setShowEditForm(false); // Ocultar el formulario de edición
  //         setEditingData(null); // Limpiar los datos de edición
  //       } else {
  //         console.error('Error al guardar los cambios:', res.data.Error);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Error de red o del servidor:', err);
  //     });
  // };
  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
              <div className='nav-lista'>
              <h2>Lista de calidades de granos</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Descripcion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data? data.map((item) => ( 
                      <tr key={item.id_calidad_grano}>
                        <th scope="row">{item.id_calidad_grano}</th> 
                        <td>{item.descripcion}</td>
                      </tr>
                      )) : []}
                  </tbody>
                  </table>
                </div>
                <Link to="/AddCalidadGrano" className='btn btn-primary'>Agregar calidad grano</Link>
                {/* {showEditForm && (
                <Edit_marca
                  datosEdicion={editingData}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              )} */}
              </div>
            </div>
            </>
        </div>
    </>
  );
}

export default ListaCalidadesGranos;
