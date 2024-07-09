import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_producto from './edit_producto';
import { Link } from 'react-router-dom';
// import './lista_entrega_cargas.css'
import ProductosPDF from "./ProductosPDF";


const filterProductos = (data, filterType, searchText, filterDate) => {
  return data.filter((data) => {
    if (filterType === "tipo_producto") {
      return data.tipo_producto.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "principios_activos") {
      return data.principios_activos.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "marca") {
      return data.marca.toLowerCase().includes(searchText.toLowerCase());
    }  
    else if (filterType === "empresa_proveedora") {
      console.log("data.empresa_proveedora: ",data.empresa_proveedora)
      return data.empresa_proveedora.toLowerCase().includes(searchText.toLowerCase());
    }    
    

    return true; // Fallback para otros casos
  });
};


function ListaProductos() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("tipo_producto");
  const [filterDate, setFilterDate] = useState("");
  const [FilteredProductos, setFilteredProductos] = useState([]);

  useEffect(() => { //Obtiene los datos usados para listar los productos entregadas
    // try{
    //     axios.get('http://localhost:8081/productos')
    //     setData(res.data.data);
    // }catch{((err) => console.error(err));}
    axios.get('http://localhost:8081/productos')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  const handleDeleteClick = (productoId) => {
    axios.put(`http://localhost:8081/eliminarProducto/${productoId}`) 
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {

          axios.post('http://localhost:8081/insertarAuditoria', ['DeleteProducto']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));


            console.log("entrega_producto eliminada con exito")
            setData(data.filter((item) => item.id !== productoId));
            window.location.reload();
        } else {
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar la producto:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (productoId) => {
    axios.get(`http://localhost:8081/productoEdit/${productoId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log("res.data.data: ",res.data.data)
          setEditingData(res.data.data); // Datos de la producto que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de producto para edición:', res.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error de red o del servidor:', err);
      });
  };

  const handleCancelEdit = () => {
    setShowEditForm(false); // Ocultar el formulario de edición
    setEditingData(null); // Limpiar los datos de edición
  };

  const handleSaveEdit = (editedData) => {
    // En este punto, `editedData` contiene los datos editados del formulario
    // Realiza una solicitud al servidor para actualizar los datos
    axios.put(`http://localhost:8081/producto/${editingData.id_producto}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados


          axios.post('http://localhost:8081/insertarAuditoria', ['EditProducto']) 
          .then(res => { 
              if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                  console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                  event.target.reset();
                  window.location.reload();
              } else { //Y acá si salió mal
                  setError(res.data.Error); //Setea el error para mostrar
              }
          }).catch(err => console.log(err));



          setRefresh(refresh?0:1)
          setShowEditForm(false); // Ocultar el formulario de edición
          setEditingData(null); // Limpiar los datos de edición
        } else {
          console.error('Error al guardar los cambios');
        }
      })
      .catch((err) => {
        console.error('Error de red o del servidor:', err);
      });
  };

  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterProductos(data, filterType, searchText, filterDate);
    setFilteredProductos(filteredData);
  }, [data, filterType, searchText, filterDate]);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSearchText("");
    setFilterDate("");
  };

  const handleFilterInputChange = (e) => {
    setSearchText(e.target.value);
    setFilterDate(e.target.value);
  };

  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>

            <div className="row pb-3">
                  <div className="col-md-6 w-50">
                    <select className="w-75 form-select" value={filterType} onChange={handleFilterTypeChange}>
                      <option value="tipo_producto">Tipo producto</option>
                      <option value="principios_activos">Principios activos</option>
                      <option value="marca">Marca</option>
                      <option value="empresa_proveedora">Empresa proveedora</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    {filterType === "tipo_producto" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por tipo_producto"
                      />
                    )}
                    {filterType === "principios_activos" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por principios activos"
                      />
                    )}
                    {filterType === "marca" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por marca"
                      />
                    )}
                    {filterType === "empresa_proveedora" && (
                      <input className="w-50 form-control"
                        id="id_filter"
                        type="text"
                        value={searchText}
                        onChange={handleFilterInputChange}
                        placeholder="Buscar por empresa proveedora"
                      />
                    )}
                  </div>
              </div>

            <div>
                  <button
                    className="btn btn-primary ml-10"
                    onClick={() => ProductosPDF(FilteredProductos)} 
                  >
                    Generar reporte
                  </button>
              </div>
              <div className='nav-lista'>
              <h2>Productos:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Descripcion:</th>
                      <th scope="col">Tipo producto:</th>
                      <th scope="col">Principios activos:</th>
                      <th scope="col">Dosis:</th>
                      <th scope="col">Marca:</th>
                      <th scope="col">Empresa proveedora:</th>
                      <th scope="col">Stock:</th> 
                      <th scope="col">Unidad medida:</th>
                      <th scope="col">Precio:</th> 
                      <th scope="col">Costo por hectarea:</th> 
                      <th scope="col">Editar</th> 
                      <th scope="col">Eliminar</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {FilteredProductos? FilteredProductos.map((item) => ( 
                      <tr key={item.id_producto}> 
                        <th scope="row">{item.id_producto}</th> 
                        <td>{item.descripcion}</td>
                        <td>{item.tipo_producto}</td>
                        <td>{item.principios_activos}</td>
                        <td>{item.dosis}</td>
                        <td>{item.marca}</td>
                        <td>{item.empresa_proveedora}</td>
                        <td>{item.stock}</td>
                        <td>{item.unidad_medida}</td>
                        <td>{item.precio}</td>
                        <td>{item.costo_por_hectarea}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_producto)}>Editar</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDeleteClick(item.id_producto)}>Eliminar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddProducto" className='btn btn-primary'>Agregar producto</Link>
                {showEditForm && (
                <Edit_producto
                  datosEdicion={editingData}
                  onCancel={handleCancelEdit}
                  onSave={handleSaveEdit}
                />
              )}
              </div>
            </div>
            </>
        </div>
    </>
  );
}

export default ListaProductos;
