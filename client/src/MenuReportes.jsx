import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuReportes() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group">
              <nav class="navbar navbar-light bg-light">
                <a class="nav-link" href="/Totales">Totales</a>
                <a class="nav-link" href="/IngresosRep">Ingresos</a>
                <a class="nav-link" href="/lista_egresos">Egresos</a>
                <a class="nav-link" href="/lista_stock_silo">Stock silo</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuReportes;