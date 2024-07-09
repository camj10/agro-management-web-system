import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import EgresosDetPDF from './EgresosDetPDF';

const filterEgreso = (data, filterType, searchText, filterDate) => {
  return data.filter((data) => {
    if (filterType === "parcela") {
      return data.parcela.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "zafra") {
      return data.zafra.toLowerCase().includes(searchText.toLowerCase());
    } 
    return true; // Fallback para otros casos
  });
};

function ListaEgresos() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);
  const[refresh,setRefresh]=useState(0) 
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("parcela");
  const [filterDate, setFilterDate] = useState("");
  const [filteredEgreso, setFilteredEgreso] = useState([]);

//   id_egreso	id_producto_parcela	fecha	precio_por_hectarea	cantidad_hectareas	producto parcela zafra
  useEffect(() => { 
    axios.get('http://localhost:8081/ListarEgresos') 
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
  
  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterEgreso(data, filterType, searchText, filterDate);
      setFilteredEgreso(filteredData);
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
  console.log("filtered egreso:",filteredEgreso)
  return (
    <>
      <div className='container-lista-gral'>
            <>
            <div className='container-lista'>
              <div className="row pb-3">
                <div className="col-md-6 w-50">
                  <select className="w-75 form-select" value={filterType} onChange={handleFilterTypeChange}>
                    <option value="zafra">Zafra</option>
                    <option value="parcela">Parcela</option>
                  </select>
                </div>
                <div className="col-md-6">
                  {filterType === "zafra" && (
                    <input className="w-50 form-control"
                      id="id_filter"
                      type="text"
                      value={searchText}
                      onChange={handleFilterInputChange}
                      placeholder="Buscar por zafra"
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
                </div>
              </div>

              <div>
                  <button
                    className="btn btn-primary m-1"
                    onClick={() => EgresosDetPDF(filteredEgreso)}
                  >
                    Generar reporte
                  </button>
              </div>

              <div className='nav-lista'>
              <h2>Egresos:</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>	
                      <th scope="col">Id</th>
                      <th scope="col">Fecha:</th>
                      <th scope="col">Costo por hectárea:</th>
                      <th scope="col">Cantidad hectáreas:</th>
                      <th scope="col">Monto egreso:</th>
                      <th scope="col">Producto aplicado:</th>
                      <th scope="col">Parcela:</th>
                      <th scope="col">Zafra:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEgreso? filteredEgreso.map((item) => ( 
                      <tr key={item.id_egreso}> 
                        <td>{item.id_egreso}</td>
                        <td>{item.fecha}</td>
                        <td>{item.costo_por_hectarea}</td>
                        <td>{item.cantidad_hectareas}</td>
                        <td>{item.monto_egreso}</td>
                        <td>{item.producto}</td>
                        <td>{item.parcela}</td>
                        <td>{item.zafra}</td>
                      </tr>
                      )) : []}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </>
        </div>
    </>
  );
}

export default ListaEgresos;
