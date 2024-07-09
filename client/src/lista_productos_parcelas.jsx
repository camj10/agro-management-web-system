import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Edit_producto_parcela from './edit_producto_parcela';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import ProductosParcelasGeneratePDF from './ProductosParcelasGeneratePDF';

const filterProductosParcelas = (data, filterType, searchText, filterDate) => {
  return data.filter((productoParcela) => {
    if (filterType === "producto") {
      return productoParcela.producto.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "parcela") {
      return productoParcela.parcela.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "tipo_trabajo") {
      return productoParcela.tipo_trabajo.toLowerCase().includes(searchText.toLowerCase());
    }    
    else if (filterType === "zafra") {
      return productoParcela.zafra.toLowerCase().includes(searchText.toLowerCase());
    }
    return true; // Fallback para otros casos
  });
};

function ListaProductosParcelas() {
  const [auth, setAuth] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("producto");
  const [filterDate, setFilterDate] = useState("");
  const [filteredProductoParcela, setFilteredProductoParcela] = useState([]);
  axios.defaults.withCredentials = true;
  
  useEffect(()=>{//Verifica si está autenticado 
    axios.get('http://localhost:8081')
    .then(res => {
        if(res.data.Status === 'Success') {
          setAuth(true)
        } else {
          setAuth(false)
        }
    }).catch(err => console.log(err));

}, [])
  const [data, setData] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const[refresh,setRefresh]=useState(0) 

  useEffect(() => { 
    axios.get('http://localhost:8081/productosParcelas')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data);
        } else {
          console.log('Error');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);
  let fechaFormateada = 1
  data? data.map((item) => (fechaFormateada = format(parseISO(item.fecha),'yyyy-MM-dd'),item.fecha=fechaFormateada)):''

  const handleDeleteClick = (productoParcelaId) => {
    axios.put(`http://localhost:8081/eliminarProductoParcela/${productoParcelaId}`)
      .then((res) => {
        // Verificar si la eliminación fue exitosa
        if (res.data.Status === 'Success') {

            axios.post('http://localhost:8081/insertarAuditoria', ['DeleteProductoParcela']) 
            .then(res => { 
                if(res.data.Status === 'Success') { //Acá nos brinda la respuesta si salió bien
                    console.log("insertarAuditoria correctamente añadida ",res.data.Status)
                } else { //Y acá si salió mal
                    setError(res.data.Error); //Setea el error para mostrar
                }
            }).catch(err => console.log(err));



            console.log("producto_parcela eliminada con exito")
            setData(data.filter((item) => item.id !== productoParcelaId));
            window.location.reload();
        } else {
          // Manejar cualquier error que el servidor haya devuelto
          console.error('Error al eliminar producto_parcela:', res.data.Error);
        }
      })
      .catch((err) => {
        // Manejar errores de red o del servidor
        console.error('Error de red o del servidor:', err);
      });
  };
  const handleEditClick = (productoParcelaId) => {
    axios.get(`http://localhost:8081/productoParcelaEdit/${productoParcelaId}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          console.log("res.data.data: ",res.data.data)
          setEditingData(res.data.data); // Datos de la productoParcelaId que deseas editar
          setShowEditForm(true); // Mostrar el formulario de edición
        } else {
          console.error('Error al obtener datos de productoParcelaId para edición:', res.data.Error);
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
    console.log("editedData: ",editedData)
    // En este punto, `editedData` contiene los datos editados del formulario
    // Realiza una solicitud al servidor para actualizar los datos
    axios.put(`http://localhost:8081/productoParcela/${editingData.id_producto_parcela}`, editedData)
      .then((res) => {
        if (res.data.Status === 'Success') {// Actualiza los datos en la lista con los datos editados

          axios.post('http://localhost:8081/insertarAuditoria', ['EditProductoParcela']) 
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
    const filteredData = filterProductosParcelas(data, filterType, searchText, filterDate);
    setFilteredProductoParcela(filteredData);
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
      <div className='container-lista-gral' >
            <>
            <div className='container-lista'>
        <div className="row pb-3">
        <div className="col-md-6 w-50">
          <select className="w-75 form-select" value={filterType} onChange={handleFilterTypeChange}>
            <option value="producto">Producto</option>
            <option value="parcela">Parcela</option>
            <option value="tipo_trabajo">Tipo de trabajo</option>
            <option value="zafra">Zafra</option>
          </select>
        </div>
        <div className="col-md-6">
          {filterType === "producto" && (
            <input className="w-50 form-control"
              id="id_filter"
              type="text"
              value={searchText}
              onChange={handleFilterInputChange}
              placeholder="Buscar por producto"
            />
          )}
          {filterType === "parcela" && (
            <input className="w-50 form-control"
              id="id_filter"
              type="text"
              value={searchText}
              onChange={handleFilterInputChange}
              placeholder="Buscar por parcela"
            />
          )}
          {filterType === "tipo_trabajo" && (
            <input className="w-50 form-control"
              id="id_filter"
              type="text"
              value={searchText}
              onChange={handleFilterInputChange}
              placeholder="Buscar por tipo de trabajo"
            />
          )}
          {filterType === "zafra" && (
            <input className="w-50 form-control"
              id="id_filter"
              type="text"
              value={searchText}
              onChange={handleFilterInputChange}
              placeholder="Buscar por zafra"
            />
          )}
        </div>
      </div>
              
      <div>
        <button
          className="btn btn-primary ml-10"
          onClick={() => ProductosParcelasGeneratePDF(filteredProductoParcela)}
        >
          Generar reporte
        </button>
      </div>
              <div className='nav-lista'>
              <h2>Productos aplicados en parcela:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Fecha:</th>
                      <th scope="col">Producto:</th>
                      <th scope="col">Cantidad:</th> 
                      <th scope="col">Tipo trabajo:</th>
                      <th scope="col">Parcela:</th> 
                      <th scope="col">Zafra:</th> 
                      <th scope="col">Editar</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProductoParcela? filteredProductoParcela.map((item) => ( 
                      <tr key={item.id_producto_parcela}> 
                        <th scope="row">{item.id_producto_parcela}</th> 
                        <td>{item.fecha}</td>
                        <td>{item.producto}</td>
                        <td>{item.cantidad}</td>
                        <td>{item.tipo_trabajo}</td>
                        <td>{item.parcela}</td>
                        <td>{item.zafra}</td>
                        <td><button className="btn btn-warning" onClick={() => handleEditClick(item.id_producto_parcela)}>Editar</button></td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
                <Link to="/AddProductoParcela" className='btn btn-primary m-1'>Añadir producto en parcela</Link>
                {showEditForm && (
                <Edit_producto_parcela
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

export default ListaProductosParcelas;
