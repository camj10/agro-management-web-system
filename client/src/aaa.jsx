import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductosParcelasReport from "./ProductosParcelasReport.jsx";

const filterProductosParcelas = (productosParcelas, filterType, searchText, filterDate) => {
  return productosParcelas.filter((productoParcela) => {
    if (filterType === "producto") {
      return productoParcela.producto.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "parcela") {
      return productoParcela.parcela.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "fecha") {
      const productoParcelaDate = new Date(productoParcela.fecha).toLocaleDateString("es-ES");
      return productoParcelaDate.includes(filterDate);
    } else if (filterType === "tipo_trabajo") {
      return productoParcela.tipo_trabajo.toLowerCase().includes(searchText.toLowerCase());
    }
    return true; // Fallback para otros casos
  });
};

function Aaa() {
  axios.defaults.withCredentials = true;
  const [productosParcelas, setProductosParcelas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("producto");
  const [filterDate, setFilterDate] = useState("");
  const [filteredProductoParcela, setFilteredProductoParcela] = useState([]);

  useEffect(() => {
    if (productosParcelas.length === 0) {
      axios.get('http://localhost:8081/productosParcelas') 
        .then((res) => {
          if (res.data.Status === 'Success') {
            setProductosParcelas(res.data.data);
          } else {
            console.log('Error al obtener datos de productosParcelas');
          }
        })
        .catch((err) => console.error(err));
    }
  }, []); // Dependencia de productosParcelas

  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterProductosParcelas(productosParcelas, filterType, searchText, filterDate);
    setFilteredProductoParcela(filteredData);
  }, [productosParcelas, filterType, searchText, filterDate]);

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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="mb-0">Productos parcelas</h1>
      </div>
      <div className="row pb-3">
        <div className="col-md-6 w-50">
          <select className="w-75 form-select" value={filterType} onChange={handleFilterTypeChange}>
            <option value="producto">Producto</option>
            <option value="parcela">Parcela</option>
            <option value="fecha">Fecha</option>
            <option value="tipo_trabajo">Tipo de trabajo</option>
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
          {filterType === "fecha" && (
            <input className="w-50 form-control"
              type="text"
              value={filterDate}
              onChange={handleFilterInputChange}
              placeholder="Buscar por fecha"
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
        </div>
      </div>
      <div className="row">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Tipo de trabajo </th>
              <th>Parcela</th>
              <th>Zafra</th>
            </tr>
          </thead>
          <tbody>
            {filteredProductoParcela.map((productoParcela, index) => (
              <tr key={index}>
                <td>{productoParcela.fecha}</td>
                <td>{productoParcela.producto}</td>
                <td>{productoParcela.cantidad}</td>
                <td>{productoParcela.precio_producto}</td>
                <td>{productoParcela.tipo_trabajo}</td>
                <td>{productoParcela.parcela}</td>
                <td>{productoParcela.zafra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Aaa;
