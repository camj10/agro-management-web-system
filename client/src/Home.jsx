import React, { useEffect, useState } from 'react' 
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import DrawPolygonMap from './DrawPolygonMap';
import {PlantacionSoja} from '../src/img/PlantacionSoja.jpeg'

function Home() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  axios.defaults.withCredentials = true;
  const menuStyle = {
    backgroundColor: 'Limegreen', // Puedes cambiar el color según tus preferencias
    padding: '10px', // Agrega algún espaciado si es necesario
    width: '100%'
  };
  return (
    <>
      <div className='container mt-4' style={menuStyle}>
          {/* {
            auth ? */}
            <>
              <div>
              </div>
              <div>
                  <h1>Bienvenido {username}!</h1>
                  <DrawPolygonMap/>
              </div>
            </>
            {/* :
            <div>
                <h3>No estás autenticado</h3>
                <h3>{message}</h3>
                <Link to="/login" className='btn btn-primary'>Login</Link>
            </div>
          } */}
      </div>
    </>
  )
}

export default Home