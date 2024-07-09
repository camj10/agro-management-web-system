import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import './lista_entrega_cargas.css'

function ListaEmpresasProveedoras() {
  const [auth, setAuth] = useState(false);
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { 
    axios.get('http://localhost:8081/empresasProveedoras')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
              <div className='nav-lista'>
              <h2>Empresas proveedoras:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Nombre:</th>
                      <th scope="col">Teléfono:</th>
                      <th scope="col">Email:</th>
                      <th scope="col">Pais:</th>
                      <th scope="col">Departamento:</th>
                      <th scope="col">Ciudad:</th> 
                      <th scope="col">Barrio:</th>
                      <th scope="col">Direccion:</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {data? data.map((item) => ( 
                      <tr key={item.id_empresa_proveedoras}> 
                        <th scope="row">{item.id_empresa_proveedoras}</th> 
                        <td>{item.nombre}</td>
                        <td>{item.telefono}</td>
                        <td>{item.email}</td>
                        <td>{item.pais}</td>
                        <td>{item.departamento}</td>
                        <td>{item.ciudad}</td>
                        <td>{item.barrio}</td>
                        <td>{item.direccion}</td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddEmpresaProveedora" className='btn btn-primary'>Agregar empresa proveedora</Link>
              </div>
            </div>
            </>
        </div>
    </>
  );
}

export default ListaEmpresasProveedoras;
