import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuNuevo() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
        <div className='container'>
          <div class="list-group">
            <nav class="navbar navbar-light bg-light">
              <a class="nav-link" href="/AddEmpresaProveedora">Añadir empresa proveedora</a>
              <a class="nav-link" href="/AddEmpresaSilo">Añadir empresa silo</a>
              <a class="nav-link" href="/AddTipoTrabajo">Añadir tipo de trabajo</a>
              <a class="nav-link" href="/AddZafra">Añadir zafra</a>
              <a class="nav-link" href="/AddCalidadGrano">Añadir calidad de grano</a>
              <a class="nav-link" href="/AddIngreso">Añadir ingreso</a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuNuevo;
