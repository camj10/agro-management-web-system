import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ListaParcelas() {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  const [auth, setAuth] = useState(false); 
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);


  useEffect(() => {
    // Obtiene los datos usados para listar las parcelas
    axios.get('http://localhost:8081/Listarparcelas')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error al obtener datos de parcelas');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  const handleVerMapaClick = (coordenadas) => {
    console.log("coordenadas-lista_parcelas: ",coordenadas)
    navigate(`/ViewParcela?coordenadas=${coordenadas}`);
  };

  const handleDeleteClick = (parcelaId) => {
    console.log(parcelaId)
    axios.put(`http://localhost:8081/borrarParcela/${parcelaId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {

          axios.post('http://localhost:8081/insertarAuditoria', ['DeleteParcela']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                  event.target.reset();
                  window.location.reload();
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));



          console.log("Parcela eliminada con éxito");
          setData(data.filter((item) => item.id_parcela !== parcelaId));
          setRefresh(refresh + 1);
        } else {
          console.error('Error al eliminar la parcela:', res.data.Error);
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
                <h2>Lista de parcelas</h2>
                <div className='tab-lista'>

                                                 <table className="table">
                                   <thead className="thead-dark"> 
                                     <tr>
                                         <th scope="col">Id</th>
                                         <th scope="col">Cantidad_hectareas:</th>
                                         <th scope="col">Descripcion</th>
                                         <th scope="col">Pais:</th>
                                         <th scope="col">Departamento</th>
                                         <th scope="col">Ciudad:</th>
                                         <th scope="col">Barrio:</th>
                                         <th scope="col">Eliminar</th>
                                         <th scope="col">En mapa</th>
                                     </tr>
                                   </thead>
                                   <tbody>
                                       {data? data.map((item) => ( 
                                           <tr key={item.id_parcela}>
                                              <th scope="row">{item.id_parcela}</th> 
                                                 <td>{item.cantidad_hectareas}</td>
                                                 <td>{item.descripcion}</td>
                                                 <td>{item.pais}</td>
                                                 <td>{item.departamento}</td>
                                                 <td>{item.ciudad}</td>
                                                 <td>{item.barrio}</td>
                                                 <td>
                                                   <button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_parcela)}>Eliminar</button>
                                                 </td>
                                                 <td>
                                                  <button className='btn btn-info' onClick={() => handleVerMapaClick(item.coordenadas)}>Ver</button>
                                                </td>
                                            </tr>
                                         )) : []}
                                   </tbody>
                               </table>

                </div>
                <Link to="/Addparcelas" className='btn btn-primary'>Agregar parcela</Link>
              </div>
            </div>
          </>
      </div>
    </>
  );
}

export default ListaParcelas;
