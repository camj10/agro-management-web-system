import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StockSiloPDF from './StockSiloPDF';


const filterStockSilo = (data, filterType, searchText, filterDate) => {
  return data.filter((data) => {
    if (filterType === "empresa_silo") {
      return data.empresa_silo.toLowerCase().includes(searchText.toLowerCase());
    }    
    return true; // Fallback para otros casos
  });
};


function Lista_stock_silo() {
  axios.defaults.withCredentials = true;
  
  const [data, setData] = useState([]);
  const[refresh,setRefresh]=useState(0) 
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("empresa_silo");
  const [filterDate, setFilterDate] = useState("");
  const [FilteredStockSilo, setFilteredStockSilo] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8081/VerStockSilo')
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.data)
        } else {
          console.log('Error al obtener datos de StockSilo');
        }
      })
      .catch((err) => console.error(err));
  }, [refresh]);

  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterStockSilo(data, filterType, searchText, filterDate);
    setFilteredStockSilo(filteredData);
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
                     <option value="empresa_silo">Empresa silo</option>
                   </select>
                 </div>
                 <div className="col-md-6">
                   {filterType === "empresa_silo" && (
                     <input className="w-50 form-control"
                       id="id_filter"
                       type="text"
                       value={searchText}
                       onChange={handleFilterInputChange}
                       placeholder="Buscar por empresa silo"
                     />
                   )}
                 </div>
            </div>
              
            <div>
                  <button
                    className="btn btn-primary ml-10"
                    onClick={() => StockSiloPDF(FilteredStockSilo)} 
                  >
                    Generar reporte
                  </button>
              </div>
              <div className='nav-lista'>
              <h2>Stock en silo</h2>
                <div className='tab-lista'>
                <table className="table">
                  <thead className="thead-dark"> 
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Empresa silo:</th>
                      <th scope="col">Cantidad:</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FilteredStockSilo? FilteredStockSilo.map((item) => ( 
                      <tr key={item.id_stock_silo}>
                        <th scope="row">{item.id_stock_silo}</th> 
                        <td>{item.empresa_silo}</td>
                        <td>{item.cantidad}</td>
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

export default Lista_stock_silo; 
