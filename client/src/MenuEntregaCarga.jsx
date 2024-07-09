import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuEntregaCarga() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group">
              <nav class="navbar navbar-light bg-light">
                <a class="nav-link" href="/entrega_cargas">Añadir entrega de carga</a>
                <a class="nav-link" href="/lista_entrega_cargas">Entregas de carga</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuEntregaCarga;