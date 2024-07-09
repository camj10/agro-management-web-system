import React, { useEffect, useState } from 'react'
import Login from './Login'
import Home from './Home'
import Register from './Register'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import EntregaCargas from './entrega_cargas'
import ListaEntregaCargas from './lista_entrega_cargas'
import Marcas from './AddMarca'
import Parcelas from './Addparcelas'
import ListaMarcas from './lista_marca'
import { Router } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ListaParcelas from './lista_parcelas.jsx'
import AddProducto from './AddProducto'
import ListaProductos from './lista_productos'
import ListaEmpresasProveedoras from './listaEmpresasProveedoras'
import AddEmpresaProveedora from './AddEmpresaProveedora'
import ListaEmpresasSilos from './listaEmpresasSilos'
import AddEmpresaSilo from './AddEmpresaSilo'
import AddCalidadGrano from './AddCalidadGrano'
import ListaCalidadesGranos from './lista_calidades_granos'
import ViewParcela from './ViewParcela.jsx'
import AddProductoParcela from './AddProductoParcela'
import ListaProductosParcelas from './lista_productos_parcelas'
import AddTipoTrabajo from './AddTipoTrabajo'
import ListaTiposTrabajos from './lista_tipos_trabajos'
import AddZafra from './AddZafra'
import ListaZafras from './lista_zafras'
import Lista_stock_silo from './lista_stock_silo'
import AddIngreso from './AddIngreso'
import ListaIngresos from './lista_ingresos.jsx'
import AddStockProducto from './AddStockProducto.jsx'
import ListaEgresos from './lista_egresos.jsx'
import Aaa from './aaa.jsx'
import IngresosRep from './IngresosRep.jsx'
import Totales from './totales.jsx'
import MenuNuevo from './MenuNuevo.jsx'
import MenuReportes from './MenuReportes.jsx'
import MenuOtrosDatos from './MenuOtrosDatos.jsx'
import Edit_parcela from './edit_parcelas.jsx'
import MenuProducto from './MenuProducto.jsx'
import MenuProductoParcela from './MenuProductoParcela.jsx'
import MenuEntregaCarga from './MenuEntregaCarga.jsx'
import MenuParcela from './MenuParcela.jsx'
import { useCookie, useLocalStorage } from 'react-use';
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import axios from 'axios'
import { isAdmin } from './utils/LocalStorageServices.js'
 

function App() {
  const [user, setUser] = useCookie('token');
  const[rol, setRol]=useLocalStorage('Rol')
  const [auth, setAuth] = useState(false);
  const [role, setRole] = useState([])
  console.log("user: ",user)
  useEffect(()=>{//Verifica si está autenticado 
    axios.get('http://localhost:8081')
    .then(res => {
        if(res.data.Status === 'Success') {
          console.log("res.data: ",res.data)
          localStorage.setItem('Rol', response.data.role);
          setAuth(true)
          setRole(res.data.role)
        } else {
          setAuth(false)
        }
    }).catch(err => console.log(err));
  }, [])

  const menuStyle = {
    backgroundColor: 'green', // Puedes cambiar el color según tus preferencias
    padding: '10px', // Agrega algún espaciado si es necesario
    width: '100%'
  };

  return (
    <>
    <div style={menuStyle}>
    </div>
    <BrowserRouter>
      <Navbar />
      <Routes>
        
          auth ?     <>
          <Route element={<ProtectedRoute canActivate={user} redirectPath='/login' />}>
              <Route path="/register" element={<Register />} />
              <Route path="/entrega_cargas" element={<EntregaCargas />} />
              <Route path="/lista_entrega_cargas" element={<ListaEntregaCargas />} />
              <Route path="/AddMarca" element={<Marcas />} />
              <Route path="/lista_marca" element={<ListaMarcas />} />
              <Route path="/Addparcelas" element={<Parcelas />} /> 
              <Route path="/ListaParcelas" element={<ListaParcelas />} /> 
              <Route path="/Edit_parcela" element={<Edit_parcela />} /> 
              <Route path="/AddProducto" element={<AddProducto />} /> 
              <Route path="/ListaProductos" element={<ListaProductos />} /> 
              <Route path="/AddEmpresaProveedora" element={<AddEmpresaProveedora />} /> 
              <Route path="/ListaEmpresasProveedoras" element={<ListaEmpresasProveedoras />} /> 
              <Route path="/AddEmpresaSilo" element={<AddEmpresaSilo />} /> 
              <Route path="/ListaEmpresasSilos" element={<ListaEmpresasSilos />} /> 
              <Route path="/AddCalidadGrano" element={<AddCalidadGrano />} />
              <Route path="/listarCalidadesGranos" element={<ListaCalidadesGranos />} />
              <Route path="/ViewParcela" element={<ViewParcela />} />
              <Route path="/ListaProductosParcelas" element={<ListaProductosParcelas />} /> 
              <Route path="/AddProductoParcela" element={<AddProductoParcela />} /> 
              <Route path="/ListaTiposTrabajos" element={<ListaTiposTrabajos />} /> 
              <Route path="/AddTipoTrabajo" element={<AddTipoTrabajo />} />  
              <Route path="/ListaZafras" element={<ListaZafras />} /> 
              <Route path="/AddZafra" element={<AddZafra />} /> 
              <Route path="/lista_stock_silo" element={<Lista_stock_silo />} /> 
              <Route path="/AddIngreso" element={<AddIngreso />} /> 
              <Route path="/lista_ingresos" element={<ListaIngresos />} /> 
              <Route path="/AddStockProducto" element={<AddStockProducto />} /> 
              <Route path="/lista_egresos" element={<ListaEgresos />} /> 
              <Route path="/aaa" element={<Aaa />} /> 
              <Route path="/IngresosRep" element={<IngresosRep />} /> 
              <Route path="/Totales" element={<Totales />} /> 
              { isAdmin() && 
                <Route path="/MenuNuevo" element={<MenuNuevo />} />
              } 
              { isAdmin() && 
                <Route path="/MenuReportes" element={<MenuReportes />} /> 
              } 
              { isAdmin() && 
                <Route path="/MenuOtrosDatos" element={<MenuOtrosDatos />} />
              }  
              <Route path="/MenuProducto" element={<MenuProducto />} /> 
              <Route path="/MenuProductoParcela" element={<MenuProductoParcela />} />
              <Route path="/MenuEntregaCarga" element={<MenuEntregaCarga />} />
              { isAdmin() && 
                <Route path="/MenuParcela" element={<MenuParcela />} />
              } 
              <Route path="/" element={<Home />} />   
          </Route> 
          </>
          : 
          <>
          <Route path="/login" element={<Login />} />
          </>
          
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App