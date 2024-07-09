import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAdmin } from './utils/LocalStorageServices';

const Navbar = () => {  
  const [auth, setAuth] = useState(false);
  useEffect(()=>{//Verifica si está autenticado 
    axios.get('http://localhost:8081')
    .then(res => {
        if(res.data.Status === 'Success') {
          console.log("App verifyUser")
          setAuth(true)
        } else {
          setAuth(false)
        }
    }).catch(err => console.log(err));

}, [])
const menuStyle = {
  backgroundColor: 'red', // Puedes cambiar el color según tus preferencias
  padding: '10px', // Agrega algún espaciado si es necesario
  width: '100%'
};

  const handleDelete = () => {
  axios.get('http://localhost:8081/logout') 
    .then(res => {
      location.reload(true);
  }).catch(err => console.log(err));
}
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" >
      <div className="container">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            { isAdmin() && 
              <li className="nav-item">
                <Link className="nav-link" to="/MenuReportes">Reportes e informaciones</Link>
              </li>
            }
            <li className="nav-item">
              <Link className="nav-link" to="/MenuProducto">Producto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MenuProductoParcela">Producto parcela</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/MenuEntregaCarga">Entrega de carga</Link>
            </li>
            { isAdmin() && 
            <li className="nav-item">
              <Link className="nav-link" to="/MenuParcela">Parcela</Link>
            </li>
            }
            { isAdmin() && 
            <li className="nav-item">
              <Link className="nav-link" to="/MenuOtrosDatos">Otros datos</Link>
            </li>
            }
            { isAdmin() && 
            <li className="nav-item">
              <Link className="nav-link" to="/MenuNuevo">Nuevo</Link>
            </li>
            }
          </ul>
        </div>
        {auth?
          <div>
              <button className='btn btn-danger float-end' onClick={handleDelete}>Salir</button>
          </div>
          : ''
        }
      </div>
    </nav>
  );
};

export default Navbar;


