import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MenuParcela() {
  axios.defaults.withCredentials = true;

  return (
    <>
      <div className='container-lista-gral'>
          <div className='container'>
            <div class="list-group">
              <nav class="navbar navbar-light bg-light">
              <a class="nav-link" href="/Addparcelas">Nueva parcela</a>
                <a class="nav-link" href="/ListaParcelas">Parcelas</a>
              </nav>
            </div>
          </div>
      </div>
    </>
  );
}

export default MenuParcela;
