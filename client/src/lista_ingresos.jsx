import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Edit_ingreso from './edit_ingreso';
import { format, parseISO } from 'date-fns';

function ListaIngresos() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { 
    axios.get('http://localhost:8081/ListarIngreso')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  let fechaFormateada = 1
  data? data.map((item) => (fechaFormateada = format(parseISO(item.fecha),'yyyy-MM-dd'),item.fecha=fechaFormateada)):''
  
  const handleDeleteClick = (ingresoId) => {
    axios.put(`http://localhost:8081/ingresoDelete/${ingresoId}`)
    //Al eliminarse el ingreso. Se debe poner en 0 el estado y vendido igual a 0 
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {
            console.log("entrega_ingreso eliminada con exito")
            setData(data.filter((item) => item.id !== ingresoId));


            axios.post('http://localhost:8081/insertarAuditoria', ['DeleteIngreso']) 
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
          console.error('Error al eliminar la ingreso:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (ingresoId) => {
    axios.get(`http://localhost:8081/ingresoEdit/${ingresoId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log("Vuelve del get por id: ",res.data.data)
          setEditingData(res.data.data); // Datos de la ingreso que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de ingreso para edición:', res.data.Error);
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
    axios.put(`http://localhost:8081/ingreso/${editingData.id_ingreso}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados


          axios.post('http://localhost:8081/insertarAuditoria', ['EditIngreso']) 
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
        } else {
          console.error('Error al guardar los cambios');
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
              <h2>Ingresos:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>id_ingreso	
                      <th scope="col">Id</th>
                      <th scope="col">precio_venta:</th>
                      <th scope="col">Total_ingreso:</th>
                      <th scope="col">Entrega de carga N°:</th>
                      <th scope="col">Fecha:</th>
                      <th scope="col">Parcela:</th>
                      <th scope="col">Zafra:</th>
                      <th scope="col">Editar</th> 
                      <th scope="col">Eliminar</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {data? data.map((item) => ( 
                      <tr key={item.fecha}> 
                        <th scope="row">{item.id_ingreso}</th> 
                        <td>{item.id_ingreso}</td>
                        <td>{item.precio_venta}</td>
                        <td>{item.total_ingreso}</td>
                        <td>{item.entrega_de_carga}</td>
                        <td>{item.fecha}</td>
                        <td>{item.parcela}</td>
                        <td>{item.zafra}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_ingreso)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_ingreso)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddIngreso" className='btn btn-primary'>Agregar ingreso</Link>
                {showEditForm && (
                <Edit_ingreso
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

export default ListaIngresos;
