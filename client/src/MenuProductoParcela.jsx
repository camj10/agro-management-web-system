import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuProductoParcela() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group">
              <nav class="navbar navbar-light bg-light">
                <a class="nav-link" href="/AddProductoParcela">Agregar aplicación de producto en parcela</a>
                <a class="nav-link" href="/ListaProductosParcelas">Productos aplicados en parcelas</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuProductoParcela;
