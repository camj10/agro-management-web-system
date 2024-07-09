import React, { useEffect, useState } from "react";
import axios from "axios";
import IngresosDetPDF from "./IngresosDetPDF.jsx";

const filterIngreso = (ingresos, filterType, searchText, filterDate) => {
  return ingresos.filter((ingreso) => {
    if (filterType === "parcela") {
      return ingreso.parcela.toLowerCase().includes(searchText.toLowerCase());
    } else if (filterType === "zafra") {
      return ingreso.zafra.toLowerCase().includes(searchText.toLowerCase());
    } 
    return true; // Fallback para otros casos
  });
};

function IngresosRep() {
  axios.defaults.withCredentials = true;
  const [ingresos, setIngresos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("zafra");
  const [filterDate, setFilterDate] = useState("");
  const [filteredIngreso, setFilteredIngreso] = useState([]);

  useEffect(() => {
    if (ingresos.length === 0) {
      axios.get('http://localhost:8081/ListarIngreso')
        .then((res) => {
          if (res.data.Status === 'Success') {
            setIngresos(res.data.data);
          } else {
            console.log('Error al obtener datos de ingresos');
          }
        })
        .catch((err) => console.error(err));
    }
  }, []); // Dependencia de ingresos

  useEffect(() => {
    // Llama a la función de filtrado cuando cambien los filtros
    const filteredData = filterIngreso(ingresos, filterType, searchText, filterDate);
    setFilteredIngreso(filteredData);
  }, [ingresos, filterType, searchText, filterDate]);

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setSearchText("");
    setFilterDate("");
  };

  const handleFilterInputChange = (e) => {
    setSearchText(e.target.value);
    setFilterDate(e.target.value);
  };
  const [productosParcelas, setProductosParcelas] = useState([]);

  useEffect(() => {
    const getAllProductosParcelas = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/productosParcelas"
        );
        setProductosParcelas(response.data.data);
      } catch (err) {
        console.log("error");
      }
    };

    getAllProductosParcelas();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h1 className="mb-0">Productos parcelas</h1>
      </div>
      <div>
        <button
          className="btn btn-primary m-1"
          onClick={() => IngresosDetPDF(filteredIngreso)}
        >
          Generar reporte
        </button>
      </div>
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
      <div className="row">
        <table className="table table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th>Precio venta:</th>
              <th>Total ingreso:</th>
              <th>Entrega de carga N°:</th>
              <th>Fecha:</th>
              <th>Parcela:</th>
              <th>Zafra:</th>
            </tr>
          </thead>
          <tbody>
            {filteredIngreso.map((ingreso, index) => (
              <tr key={index}>
                <td>{ingreso.precio_venta}</td>
                <td>{ingreso.total_ingreso}</td>
                <td>{ingreso.entrega_de_carga}</td>
                <td>{ingreso.fecha}</td>
                <td>{ingreso.parcela}</td>
                <td>{ingreso.zafra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IngresosRep;
