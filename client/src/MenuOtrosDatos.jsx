import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuOtrosDatos() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group">
              <nav class="navbar navbar-light bg-light">
                <a class="nav-link" href="/lista_marca">Marca</a>
                <a class="nav-link" href="/listaEmpresasProveedoras">Empresas proveedoras</a>
                <a class="nav-link" href="/listaEmpresasSilos">Empresas silo</a>
                <a class="nav-link" href="/ListaTiposTrabajos"> Tipos de trabajo</a>
                <a class="nav-link" href="/ListaZafras">Zafras</a>
                <a class="nav-link" href="/listarCalidadesGranos">Calidades de granos</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuOtrosDatos;
