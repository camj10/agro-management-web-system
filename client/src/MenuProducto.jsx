import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuProducto() {
  axios.defaults.withCredentials = true;


  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group" >
              <nav class="navbar navbar-light bg-light">
              <a class="nav-link" href="/AddStockProducto">Añadir stock producto</a>
              <a class="nav-link" href="/AddProducto">Nuevo producto</a>
                <a class="nav-link" href="/ListaProductos">Productos</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuProducto;
